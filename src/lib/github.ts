import type { Product } from '@/types/product'

const GITHUB_API = 'https://api.github.com'

function getGithubConfig() {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH ?? 'main'

  if (!token || !owner || !repo) {
    throw new Error(
      'Missing GitHub configuration. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in your environment variables.'
    )
  }

  return { token, owner, repo, branch }
}

function githubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
}

interface GitHubFileResponse {
  content: string
  sha: string
  encoding: string
}

/**
 * Fetch the current products.json from GitHub and return its content + SHA.
 */
export async function fetchProductsFromGitHub(): Promise<{ products: Product[]; sha: string }> {
  const { token, owner, repo, branch } = getGithubConfig()

  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/data/products.json?ref=${branch}`
  const response = await fetch(url, {
    headers: githubHeaders(token),
    // No cache — always read latest
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[GitHub] Failed to fetch products.json:', response.status, error)
    throw new Error(`GitHub API error: ${response.status}`)
  }

  const data: GitHubFileResponse = await response.json()

  if (data.encoding !== 'base64') {
    throw new Error('Unexpected encoding from GitHub API')
  }

  const decoded = Buffer.from(data.content, 'base64').toString('utf-8')
  const products: Product[] = JSON.parse(decoded)

  return { products, sha: data.sha }
}

/**
 * Commit an updated products array to GitHub.
 */
export async function commitProductsToGitHub(
  products: Product[],
  sha: string,
  message: string
): Promise<void> {
  const { token, owner, repo, branch } = getGithubConfig()

  const content = Buffer.from(JSON.stringify(products, null, 2) + '\n').toString('base64')

  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/data/products.json`
  const body = {
    message,
    content,
    sha,
    branch,
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders(token),
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[GitHub] Failed to commit products.json:', response.status, error)
    throw new Error(`GitHub commit failed: ${response.status}`)
  }
}

/**
 * High-level helper: read current products, apply mutator fn, commit.
 */
export async function updateProductsOnGitHub(
  mutate: (products: Product[]) => Product[],
  commitMessage: string
): Promise<Product[]> {
  const { products, sha } = await fetchProductsFromGitHub()
  const updated = mutate(products)
  await commitProductsToGitHub(updated, sha, commitMessage)
  return updated
}

import { NextResponse } from 'next/server'

const DUNE_API_KEY = process.env.NEXT_DUNE_API_KEY
console.log('DUNE_API_KEY:', DUNE_API_KEY)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const queryId = searchParams.get('queryId')
  const limit = searchParams.get('limit') || '1000'

  if (!queryId) {
    return NextResponse.json({ error: 'Missing queryId' }, { status: 400 })
  }

  try {
    // get ether price from dune
    const apiUrl = `https://api.dune.com/api/v1/query/${queryId}/results?api_key=${DUNE_API_KEY}&limit=${limit}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
    }
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function GET() {
  console.log('server request')
  const mockData = {
    works: true,
  }
  return NextResponse.json(mockData)
}

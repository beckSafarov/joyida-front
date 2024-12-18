import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import adminsData from './admins.json'

export async function GET() {
  return NextResponse.json(adminsData)
}

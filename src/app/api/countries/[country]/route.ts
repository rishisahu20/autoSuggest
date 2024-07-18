import { NextRequest, NextResponse } from 'next/server';
import { getClosestCountriesHandler } from '@/app/api/controllers/countryController';
import { ValidationError } from 'joi'; // Assuming ValidationError is imported from joi

export async function GET(
  request: NextRequest,
  { params }: { params: { country: string } }
) {
  try {
    console.log('params', params);
    const response = await getClosestCountriesHandler(request, { params });
    return response; // Return the response from getClosestCountriesHandler
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      return NextResponse.json(
        { error: err.details.map((data) => data.message) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

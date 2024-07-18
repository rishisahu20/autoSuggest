import { NextRequest, NextResponse } from 'next/server';
import { getClosestCountries } from '@/app/api/services/countryService';
import { validateQuery } from '@/app/api/utils/validation';

export async function getClosestCountriesHandler(
  request: NextRequest,
  { params }: { params: { country: string } }
) {
  try {
    const query = validateQuery(request.nextUrl.searchParams);

    const closestCountries = await getClosestCountries(params.country, query);

    return NextResponse.json(closestCountries);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

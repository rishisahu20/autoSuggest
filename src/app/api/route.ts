import axios from 'axios';
import haversine from 'haversine-distance';
import joi, { ValidationError } from 'joi';
import { NextRequest, NextResponse } from 'next/server';
import { countries, ICountry } from '@/app/api/closest/[country]/data';

const querySchema = joi.object({
  lat: joi.number().max(90).min(-90).allow(null),
  long: joi.number().max(180).min(-180).allow(null),
  limit: joi.number().allow(null),
});

const sortCountriesUsingHversine = (
  a: ICountry,
  b: ICountry,
  lat: number,
  long: number
) => {
  const aDistance = haversine(
    { latitude: a.latlng[0], longitude: a.latlng[1] },
    { latitude: lat, longitude: long }
  );
  const bDistance = haversine(
    { latitude: b.latlng[0], longitude: b.latlng[1] },
    { latitude: lat, longitude: long }
  );
  return aDistance - bDistance;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { country: string } }
) {
  try {
    console.log('params', params);
    const searchParams = request.nextUrl.searchParams;
    const queryObject = {
      lat:
        searchParams.get('lat') !== null
          ? Number(searchParams.get('lat'))
          : null,
      long:
        searchParams.get('long') !== null
          ? Number(searchParams.get('long'))
          : null,
      limit:
        searchParams.get('limit') !== null
          ? Number(searchParams.get('limit'))
          : null,
    };

    joi.assert(queryObject, querySchema);

    if (!(queryObject.lat && queryObject.long)) {
      const response = await axios.get('http://ip-api.com/json?fields=lat,lon');
      const data = response.data;
      queryObject.lat = data.lat;
      queryObject.long = data.lon;
    }

    countries.sort((a, b) =>
      sortCountriesUsingHversine(
        a,
        b,
        queryObject.lat as number,
        queryObject.long as number
      )
    );

    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().startsWith(params.country.toLowerCase())
    );

    const filteredLimitedCountries = filteredCountries.slice(
      0,
      queryObject.limit ? queryObject.limit : 10
    );

    return NextResponse.json(
      filteredLimitedCountries.map((country) => ({
        name: country.name,
        region: country.region,
        latlng: country.latlng,
        callingCodes: country.callingCodes,
      }))
    );
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

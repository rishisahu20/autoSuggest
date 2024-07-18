import axios from 'axios';
import haversine from 'haversine-distance';
import { countries, ICountry } from '@/app/api/data/data';

interface QueryParams {
  lat: number | null;
  long: number | null;
  limit: number | null;
}

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

export const getClosestCountries = async (
  countryName: string,
  queryObject: QueryParams
): Promise<ICountry[]> => {
  console.log('countryName', countryName, queryObject);
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
    country.name.toLowerCase().startsWith(countryName.toLowerCase())
  );

  console.log('filteredCountries', filteredCountries);

  const filteredLimitedCountries = filteredCountries.slice(
    0,
    queryObject.limit ? queryObject.limit : 10
  );

  console.log('filteredLimitedCountries', filteredLimitedCountries);

  const mappedFilteredLimitedCountries = filteredLimitedCountries.map(
    (country) => ({
      name: country.name,
      region: country.region,
      latlng: country.latlng,
      callingCodes: country.callingCodes,
    })
  );

  console.log('mapped', mappedFilteredLimitedCountries);
  return mappedFilteredLimitedCountries;
};

// return limitedCountries.map((country) => ({
//   name: country.name,
//   region: country.region,
//   latlng: country.latlng,
//   callingCodes: country.callingCodes,
// }));

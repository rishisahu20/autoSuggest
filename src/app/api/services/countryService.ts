import axios from 'axios';
import haversine from 'haversine-distance';
import { countries, ICountry } from '@/app/api/data/data';
import { latLongApiEndpoint } from '@/constant/env';

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
  if (!(queryObject.lat && queryObject.long)) {
    const response = await axios.get(latLongApiEndpoint);
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

  const filteredLimitedCountries = filteredCountries.slice(
    0,
    queryObject.limit ? queryObject.limit : 10
  );


  const mappedFilteredLimitedCountries = filteredLimitedCountries.map(
    (country) => ({
      name: country.name,
      region: country.region,
      latlng: country.latlng,
      callingCodes: country.callingCodes,
    })
  );

  return filteredLimitedCountries.map((country) => ({
    name: country.name,
    topLevelDomain: country.topLevelDomain || [],
    alpha2Code: country.alpha2Code || '',
    alpha3Code: country.alpha3Code || '',
    callingCodes: country.callingCodes || [],
    capital: country.capital,
    altSpellings: country.altSpellings || [],
    subregion: country.subregion || '',
    region: country.region || '',
    gini: country.gini,
    population: country.population || 0,
    latlng: country.latlng || [],
    demonym: country.demonym || '',
    area: country.area,
    timezones: country.timezones || [],
    borders: country.borders || [],
    nativeName: country.nativeName || '',
    numericCode: country.numericCode || '',
    flags: country.flags || { svg: '', png: '' },
    currencies: country.currencies || [],
    languages: country.languages || [],
    translations: country.translations || {},
    flag: country.flag || '',
    regionalBlocs: country.regionalBlocs || [],
    cioc: country.cioc,
    independent: country.independent || false,
  }));
};
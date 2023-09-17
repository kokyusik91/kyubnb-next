import countries from 'world-countries';

/**
 * countries 라이브러리에서 필요한 속성들만 추린다.
 */
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  // 그냥 객체를 return 하면 되지 왜 함수에서 return 하는 걸까?
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;

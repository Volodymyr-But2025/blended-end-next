import axios from 'axios';

type GetUserInfoParams = {
  latitude: number;
  longitude: number;
};

type OpencagedataResponse = {
  results: OpencageCarensy[];
};
type OpencageCarensy = {
  annotations: {
    currency: {
      iso_code: string;
    };
  };
};

export const getUserInfo = async ({
  latitude,
  longitude,
}: GetUserInfoParams): Promise<OpencagedataResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<OpencagedataResponse>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};

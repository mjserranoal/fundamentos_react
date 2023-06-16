import client from '../../api/client';

const advertsUrl = '/api/v1/adverts';

export const getLatestAdverts = () => {
  const url = `${advertsUrl}`;
  return client.get(url);
};

export const getAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return client.get(url);
};

export const createAdvert = formData => {
  const url = advertsUrl;
  console.log(formData);
  return client.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteAdvert = advertId => {
  return client.delete(`${advertsUrl}/${advertId}`);
};

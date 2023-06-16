export const getIsLogged = state => state.auth;

export const getAdverts = state =>
  state.adverts.areLoaded ? state.adverts.data : [];

export const getAdvert = advertId => state => {
  const advert = state.adverts.data.find(advert => advert.id === advertId);
  return advert;
};

export const getUi = state => state.ui;

export const areAdvertsLoaded = state => state.adverts.areLoaded;

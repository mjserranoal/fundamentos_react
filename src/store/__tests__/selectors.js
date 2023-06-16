import { getAdvert, getIsLogged } from '../selectors';

describe('getAdvert', () => {
  test('should return a advert by advertId', () => {
    const advertId = 1;
    const adverts = [{ id: +advertId }];
    const state = { adverts: { data: adverts } };

    expect(getAdvert(advertId)(state)).toBe(adverts[0]);
  });

  test('should not return any tweet', () => {
    const advertId = '1';
    const adverts = [];
    const state = { adverts: { data: adverts } };

    expect(getAdvert(advertId)(state)).toBeUndefined();
  });
});

describe('getIsLogged', () => {
  test('should get the state of login', () => {
    const state = { auth: true };
    expect(getIsLogged(state)).toBe(true);
  });
});

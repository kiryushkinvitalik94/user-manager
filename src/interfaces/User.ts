export interface User {
  gender: string;
  dob: { date: string; age: Number };
  email: string;
  id: { name: string; value: string | null };
  location: {
    city: string;
    coordinates: any;
    country: string;
    postcode: number;
    state: string;
    streer: { number: Number; name: string };
    timezone: { offset: string; description: string };
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {
    date: string;
    age: number;
  };
}

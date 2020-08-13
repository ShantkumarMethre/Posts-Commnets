export class Service {
  static async get() {
    const response = await fetch(
      'https://codejudge-artifacts.s3.amazonaws.com/images/q-110/data.json',
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .catch((error) => console.log(error, 'error'));
    return response;
  }
}

export async function getData() {
  const resData = await fetch('http://localhost:3001/users');
  const resImg = await fetch('http://localhost:3001/images');

  const arrayData = await resData.json();
  const arrayDataImg = await resImg.json();

  const resultado = arrayData.map((item) => {
    const matchingItem = arrayDataImg.find((x) => x.name === item.photo_url);
    if (matchingItem) {
      item.public_url = matchingItem.url.publicUrl;
    }
    return item;
  });

  // console.log(resultado);

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  return resultado;
}

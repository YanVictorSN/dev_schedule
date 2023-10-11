export async function getData() {
  const resData = await fetch("http://localhost:3001/users");
  const resImg = await fetch("http://localhost:3001/images");

  const arrayData = await resData.json();
  const arrayDataImg = await resImg.json();

  const resultado = arrayData.map((item: any) => {
    const matchingItem = arrayDataImg.find(
      (x: any) => x.name === item.photo_url
    );
    if (matchingItem) {
      item.public_url = matchingItem.url.publicUrl;
    }
    return item;
  });

  return resultado;
}

export async function getData() {
  const resData = await fetch("https://vercel.com/yanvictorsns-projects/backend-dev-schedule/users");
  const resImg = await fetch("https://vercel.com/yanvictorsns-projects/backend-dev-schedule/images");

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

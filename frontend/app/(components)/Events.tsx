export async function getData() {
  const resData = await fetch("https://backend-dev-schedule.vercel.app/users");
  const resImg = await fetch("https://backend-dev-schedule.vercel.app/images");

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

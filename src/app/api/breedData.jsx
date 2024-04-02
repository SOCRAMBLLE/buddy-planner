export async function fetchBreeds(pet) {
  if (pet === "dog") {
    try {
      const data = await fetch("https://dog.ceo/api/breeds/list/all");
      const json = await data.json();
      const breedsList = json.message;
      if (!breedsList) {
        throw new Error("Breeds list is undefined or null");
      }
      const breedsArray = Object.keys(breedsList).flatMap((breed) => {
        if (breedsList[breed].length === 0) {
          return breed;
        } else {
          return breedsList[breed].map((subBreed) => `${subBreed} ${breed}`);
        }
      });
      breedsArray.unshift("crossbreed");
      console.log(breedsArray);
      return breedsArray;
    } catch (err) {
      throw new Error(err);
    }
  } else if (pet === "cat") {
    try {
      const data = await fetch("https://catfact.ninja/breeds?limit=100");
      const json = await data.json();
      const breedsList = json.data;
      if (!breedsList) {
        throw new Error("Breeds list is undefined or null");
      }
      const breedsArray = breedsList.map((cat) => cat.breed);
      console.log(breedsArray);
      return breedsArray;
    } catch (err) {
      throw new Error(err);
    }
  } else if (pet === "rabbit") {
    try {
      const rabbitBreeds = [
        "American",
        "Belgian Hare",
        "Blanc de Hotot",
        "Californian",
        "Dutch",
        "English Angora",
        "Flemish Giant",
        "French Lop",
        "Holland Lop",
        "Lionhead",
        "Mini Lop",
        "Mini Rex",
        "Netherland Dwarf",
        "New Zealand",
        "Polish",
        "Rex",
        "Satin",
        "Silver Fox",
      ];
      console.log(rabbitBreeds);
      return rabbitBreeds;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const breedData = () => {
  let data = { cat: [], dog: [], fish: [], bird: [] };

  return data;
};

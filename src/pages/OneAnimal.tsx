import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";

export const OneAnimal = () => {
  //hitta djuret med id från paramen från localstorage
  const [animalsFromLs, setAnimalsFromLs] = useState<IAnimal[]>(
    JSON.parse(localStorage.getItem("animalList") || "[]")
  );
  const { animalId } = useParams();
  const navigate = useNavigate();
  let pickedAnimal = null;

  if (animalId) {
    pickedAnimal = animalsFromLs.find((animal) => animal.id === +animalId);
  }

  function previousPage() {
    navigate("/");
  }

  function changeAnimalPropertyTest(clickedAnimalId: number) {
    setAnimalsFromLs(
      animalsFromLs.map((animal) => {
        if (animal.id === clickedAnimalId) {
          return { ...animal, name: "abc" };
        } else {
          return animal;
        }
      })
    );
  }

  useEffect(() => {
    localStorage.setItem("animalList", JSON.stringify(animalsFromLs));
  }, [animalsFromLs]);

  return (
    <>
      <button onClick={previousPage}>Tillbaka</button>
      <h1>Mer om {pickedAnimal?.name}</h1>
      <section>
        <h2>{pickedAnimal?.latinName}</h2>
        <img
          src={pickedAnimal?.imageUrl}
          alt={pickedAnimal?.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/pexels-pixabay-356079.jpg";
          }}
        />
        <p>{pickedAnimal?.shortDescription}</p>
        <div>
          <p>{pickedAnimal?.lastFed}</p>
          {pickedAnimal && (
            <button
              onClick={() => {
                changeAnimalPropertyTest(pickedAnimal?.id);
                console.log(animalsFromLs);
              }}
            >
              Mata
            </button>
          )}
        </div>
      </section>
    </>
  );
};

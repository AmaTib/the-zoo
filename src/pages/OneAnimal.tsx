import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";

export const OneAnimal = () => {
  const [animalsFromLs, setAnimalsFromLs] = useState<IAnimal[]>(
    JSON.parse(localStorage.getItem("animalList") || "[]")
  );
  const { animalId } = useParams();
  const navigate = useNavigate();
  const [pickedAnimal, setPickedAnimal] = useState<IAnimal>();

  useEffect(() => {
    localStorage.setItem("animalList", JSON.stringify(animalsFromLs));

    if (animalId) {
      setPickedAnimal(animalsFromLs.find((animal) => animal.id === +animalId));
    }
  }, [animalsFromLs, animalId]);

  function previousPage() {
    navigate("/");
  }

  function changeAnimalPropertyTest(clickedAnimalId: number) {
    setAnimalsFromLs(
      animalsFromLs.map((animal) => {
        if (animal.id === clickedAnimalId) {
          return {
            ...animal,
            lastFed: new Date().toLocaleString(),
            isFed: true,
          };
        } else {
          return animal;
        }
      })
    );
  }

  return (
    <>
      <button onClick={previousPage}>Tillbaka</button>
      <h1>{pickedAnimal?.name}</h1>
      <section>
        <h2>{pickedAnimal?.latinName}</h2>
        <img
          src={pickedAnimal?.imageUrl}
          alt={pickedAnimal?.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/pexels-markus-winkler-1430818-4097203.jpg";
          }}
        />
        <p>{pickedAnimal?.shortDescription}</p>
        <div>
          <p>{pickedAnimal?.lastFed.toLocaleString()}</p>
          {pickedAnimal && (
            <button
              onClick={() => {
                changeAnimalPropertyTest(pickedAnimal?.id);
                console.log(animalsFromLs);
              }}
              disabled={pickedAnimal?.isFed}
            >
              Mata
            </button>
          )}
        </div>
      </section>
    </>
  );
};

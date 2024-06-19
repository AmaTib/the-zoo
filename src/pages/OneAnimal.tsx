import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { ShowAnimalInfo } from "../components/ShowAnimalInfo";
import "./OneAnimal.scss";

export const OneAnimal = () => {
  const [animalsFromLs, setAnimalsFromLs] = useState<IAnimal[]>(
    JSON.parse(localStorage.getItem("animalList") || "[]")
  );
  const [pickedAnimal, setPickedAnimal] = useState<IAnimal>();
  const { animalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("animalList", JSON.stringify(animalsFromLs));

    if (animalId) {
      setPickedAnimal(animalsFromLs.find((animal) => animal.id === +animalId));
    }
  }, [animalsFromLs, animalId]);

  function previousPage() {
    navigate("/");
  }

  function feedAnimal(clickedAnimalId: number) {
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
      <button className="returnButton" onClick={previousPage}>
        &#11207; Tillbaka
      </button>
      <h2>{pickedAnimal?.name}</h2>
      <h3>{pickedAnimal?.latinName}</h3>
      <section>
        {pickedAnimal && (
          <ShowAnimalInfo pickedAnimal={pickedAnimal} feedAnimal={feedAnimal} />
        )}
      </section>
    </>
  );
};

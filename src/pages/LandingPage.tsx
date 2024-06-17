import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";

export const LandingPage = () => {
  const animalsFromLs: IAnimal[] = JSON.parse(
    localStorage.getItem("animalList") || "[]"
  );
  const [animals, setAnimals] = useState<IAnimal[]>(animalsFromLs);
  const navigate = useNavigate();

  useEffect(() => {
    if (animals.length > 0) {
      return;
    }
    async function getAnimals() {
      const response = await axios.get<IAnimal[]>(
        "https://animals.azurewebsites.net/api/animals"
      );
      setAnimals(response.data);
    }
    getAnimals();
  });

  localStorage.setItem("animalList", JSON.stringify(animals));

  function moreAnimalInfo(animalId: number) {
    navigate("/animal/" + animalId);
  }

  return (
    <>
      <h2>Dina djur</h2>

      <section>
        {animals.map((animal) => (
          <div key={animal.id} className="animalContainer">
            <img
              src={animal.imageUrl}
              alt="animal"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/pexels-markus-winkler-1430818-4097203.jpg";
              }}
            />
            <h3>
              {animal.name} ({animal.latinName})
            </h3>
            <div className="hungerStatusContainer">
              <p>Hunger:</p>
              <div
                className={`hungerStatus ${
                  animal.isFed ? "statusFed" : "statusNotFed"
                }`}
              ></div>
            </div>
            <button
              onClick={() => {
                moreAnimalInfo(animal.id);
              }}
            >
              Mer om {animal.name}
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

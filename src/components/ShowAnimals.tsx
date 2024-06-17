import { IAnimal } from "../models/IAnimal";
import { ShowAnimal } from "./ShowAnimal";

interface IShowAnimalsProp {
  moreAnimalInfo: (id: number) => void;
  animals: IAnimal[];
}

export const ShowAnimals = ({ moreAnimalInfo, animals }: IShowAnimalsProp) => {
  return (
    <>
      {animals.map((animal) => (
        <ShowAnimal
          key={animal.id}
          animal={animal}
          moreAnimalInfo={moreAnimalInfo}
        />
      ))}
    </>
  );
};

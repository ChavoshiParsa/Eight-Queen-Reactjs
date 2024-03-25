import { FormEvent, useRef, useState } from "react";
import {
  Chromosome,
  crossover,
  fitness,
  initialPopulation,
  mutation,
} from "./utils";
import Chessboard from "./Chessboard";
import Input from "./Input";

export default function App() {
  const [solution, setSolution] = useState<number[]>([]);
  const [generationTh, setGenerationTh] = useState(0);
  // const [conflict, setConflict] = useState(0);

  const queenNumber = useRef<HTMLInputElement>(null);
  const populationSize = useRef<HTMLInputElement>(null);
  const mutationRate = useRef<HTMLInputElement>(null);
  const maxGeneration = useRef<HTMLInputElement>(null);

  function startGeneration(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const n = Number(queenNumber.current?.value);
    let size = Number(populationSize.current?.value);
    const m_r = Number(mutationRate.current?.value);
    const m_g = Number(maxGeneration.current?.value);

    // 1: initial population
    let population = initialPopulation(n, size);

    // sorting
    population.sort((a, b) => a.getRank() - b.getRank());

    let generation = 0;
    while (generation < m_g + 1) {
      generation++;
      // 2: eliminate --> remove second half with bad ranking
      const firstHalf: Chromosome[] = population.slice(0, (3 * size) / 4);
      population = population.filter((chromosome) =>
        firstHalf.includes(chromosome)
      );
      size = (3 * size) / 4;

      // 3: crossover
      const children: Chromosome[] = crossover(n, size, population);

      // 4: mutation
      mutation(n, size, children, m_r);

      // 5: fitness children
      for (let i = 0; i < size; i++) {
        children[i].setRank(fitness(n, children[i].getGenes()));
      }

      // adding to main population and sort
      population.push(...children);
      population.sort((a, b) => a.getRank() - b.getRank());
      size = (size * 4) / 3;

      // update ui
      setSolution(population[0].getGenes());
      // setConflict(population[0].getRank());
      setGenerationTh(generation);

      // stop condition
      if (population[0].getRank() == 0 || generation == m_g) {
        if (generation == m_g) {
          console.log("best solution conflicts is: " + population[0].getRank());
          break;
        }
        console.log("solution found: " + population[0].getGenes());
        break;
      } else {
        console.log(
          "generation " +
            generation +
            " -> conflicts: " +
            population[0].getRank()
        );
      }
    }
    console.log(
      "generation " + generation + " -> conflicts: " + population[0].getRank()
    );
  }

  return (
    <div className="w-full min-h-screen p-4 lg:p-8 flex md:flex-row flex-col md:space-y-0 space-y-6 justify-start md:justify-center md:space-x-6 lg:space-x-12 items-center">
      <form
        className="flex flex-col justify-center items-center space-y-1 md:space-y-4 text-lg lg:text-xl"
        onSubmit={startGeneration}
      >
        <Input
          label="Queens: "
          name="queen-number"
          defaultValue={8}
          step={2}
          max={100}
          ref={queenNumber}
        />
        <Input
          label="Population: "
          name="population"
          defaultValue={32}
          step={8}
          max={1000}
          ref={populationSize}
        />
        <Input
          label="Mutation rate: "
          name="mutation-rate"
          defaultValue={0.6}
          step={0.05}
          max={1}
          ref={mutationRate}
        />
        <Input
          label="Max generation: "
          name="max-generation"
          defaultValue={10000}
          step={100}
          max={100000}
          ref={maxGeneration}
        />
        <button
          className="bg-gradient-to-r from-emerald-600 to-emerald-400 w-full
          lg:py-3 py-1.5 rounded-lg hover:opacity-80 transition active:scale-95 text-base lg:text-xl"
          type="submit"
        >
          Calculate
        </button>
        <span className="text-sm lg:text-base ">
          found in generation {generationTh}
        </span>
      </form>
      {solution.length !== 0 && (
        <div className="flex justify-center items-center space-y-4 flex-col">
          <Chessboard solution={solution} />
        </div>
      )}
    </div>
  );
}

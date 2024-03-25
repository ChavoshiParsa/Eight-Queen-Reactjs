export class Chromosome {
  private genes: number[];
  private rank: number;

  constructor(genes: number[], rank: number) {
    this.genes = genes;
    this.rank = rank;
  }

  public getGenes(): number[] {
    return this.genes;
  }

  public setGenes(genes: number[]): void {
    this.genes = genes;
  }

  public getRank(): number {
    return this.rank;
  }

  public setRank(rank: number): void {
    this.rank = rank;
  }
}

export function initialPopulation(n: number, size: number): Chromosome[] {
  const population: Chromosome[] = [];

  for (let i = 0; i < size; i++) {
    const chromosome: number[] = uniqList(0, n - 1);
    population.push(new Chromosome(chromosome, fitness(n, chromosome)));
  }

  return population;
}

export function fitness(n: number, chromosome: number[]): number {
  let conflict = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(i - j) == Math.abs(chromosome[i] - chromosome[j])) {
        conflict++;
      }
    }
  }
  return conflict;
}

export function crossover(
  n: number,
  size: number,
  population: Chromosome[]
): Chromosome[] {
  const children: Chromosome[] = [];

  for (let i = 0; i < size; i += 2) {
    const crossPoint = random(2, n - 2);

    const genes1: number[] = population[i].getGenes().slice(0, crossPoint);
    for (let j = 0; j < n; j++) {
      const genNum = population[i + 1].getGenes()[j];
      if (!genes1.includes(genNum)) genes1.push(genNum);
    }
    const genes2: number[] = population[i + 1].getGenes().slice(0, crossPoint);
    for (let j = 0; j < n; j++) {
      const genNum = population[i].getGenes()[j];
      if (!genes2.includes(genNum)) genes2.push(genNum);
    }

    const child1 = new Chromosome(genes1, 0);
    const child2 = new Chromosome(genes2, 0);
    children.push(child1);
    children.push(child2);
  }
  return children;
}

export function mutation(
  n: number,
  size: number,
  children: Chromosome[],
  mutationRate: number
) {
  for (let i = 0; i < mutationRate * size; i++) {
    const pos1 = random(0, n - 1);
    const pos2 = random(0, n - 1);

    const num1 = children[i].getGenes()[pos1];
    const num2 = children[i].getGenes()[pos2];

    children[i].getGenes()[pos1] = num2;
    children[i].getGenes()[pos2] = num1;
  }
}

function uniqList(min: number, max: number): number[] {
  const uniqList: number[] = [];
  for (let i = min; i <= max; i++) {
    uniqList.push(i);
  }
  function shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return shuffleArray(uniqList);
}

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

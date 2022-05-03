export const flavorsTranserConnectOrCreate = (flavors: string[]) => {
  return flavors.map((flavor) => {
    return {
      where: { name: flavor },
      create: { name: flavor },
    };
  });
};

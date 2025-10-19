export const IdGenerate = (prefix: string): string => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomPart = array[0].toString(36).substring(0, 5);
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}_${randomPart}_${timestamp}`;
};

// export const IdGenerate = (prefix: string): string => {
//   const randomPart = Math.random().toString(36).substring(2, 7); // random 5 chars
//   const timestamp = Date.now();
//   return `${prefix}_${randomPart}_${timestamp}`;
// };

// import randomstring from "randomstring";

// export const IdGenerate = (id: string) => {
//   id = randomstring.generate(10); // generate 10-character ID
//   return id;
// };
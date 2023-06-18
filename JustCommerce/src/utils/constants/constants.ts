export const spotifyUrl = "https://open.spotify.com/artist/";
export const iTunesUrl = "https://open.spotify.com/artist/";

export enum Mask {
  Phone = "999 999 999",
}

/**
 * In Bytes
 */
export const MB = 1048576 as const;
export const MaxFileSize = {
  Image: 5 * MB, // 5 MB
  Pdf: 10 * MB, //10 MB
  StoragedFile: 20 * MB, //10 MB
} as const;

type AvailableFormatsType = Record<
  keyof typeof MaxFileSize,
  ReadonlyArray<string>
>;

export const AvailableFormats: AvailableFormatsType = {
  Pdf: ["application/pdf"],
  Image: ["image/jpeg", "image/png", "image/jpg"],
  StoragedFile: ["*/*"],
};

export const Regex = {
  phone: /^((\+[0-9]{1,4})?[-\s./0-9]{9,})$/,
  password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_+=-?])/,
  username: /^[a-zA-Z0-9]*$/,
} as const;

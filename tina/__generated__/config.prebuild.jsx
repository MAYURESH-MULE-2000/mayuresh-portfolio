// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  clientId: "",
  // or from env
  branch: "main",
  token: "",
  // or from env in production
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // you can later mirror your Astro collections here
    ]
  }
});
export {
  config_default as default
};

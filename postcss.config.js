import tailwindcss from "@tailwindcss/postcss";
import scopeTailwind from "./postcss-scope-tailwind.mjs";

export default {
  plugins: [tailwindcss(), scopeTailwind({ scope: ".cs-dashboard-root" })],
};

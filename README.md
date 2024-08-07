# React Budget Application

<span style="color:red">**THIS PROJECT IS A WORK IN PROGRESS**</span>

A React-powered application for creating an annual spending budget and for viewing incomes and expenses against that budget. Transaction data is imported from Quicken. This application also serves as my platform for learning React.

## Concepts

This app demonstrates the following React and Firebase concepts.

- Routing
- Custom hooks
- Context
- Firebase Authentication
- Firestore CRUD
- useReducer
- useEffect
- useContext

## TODO

- Add progress indicator to upload process.
- Refactor initial loading of budget and category data.

## COMPLETE

- Persist login state upon refresh.
- Restrict access to pages based on auth state.

## LOCAL DEVELOPMENT

- Run `nvm use` and `npm run dev`

For reference, the original README is included below...

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

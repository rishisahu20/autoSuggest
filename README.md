## Frontend - main topics

- **Error handling**: Error Boundaries have been implemented to prevent and handle errors, ensuring a seamless user experience even when issues occur with fallback UI.

- **Custom Hooks**: Custom hooks (**useDebouncedCallback**, **useOutsideClick**) have been implemented to reduce bundle size and dependency on third-party libraries, promoting modularity and reusability.

- **Axios Interceptor**: Axios Interceptor works as middleware used for API calls, it simplifies the processing of requests and responses.

- **Separation of concerns**: A clear code is written, separating various concerns (API interfaces, custom threads, UI components), increasing maintainability and customizability.

- **Scalability**: Components and utilities are designed to be scalable, facilitating expansion and modification.

## Highlights

- **Functionality**: Functionality meets specified requirements, ensuring that each product and utility effectively fulfills its intended purpose.

- **User interface and design**: The UI components (**DropdownList**, **Autocomplete**) are designed to be easy to use

## Readablity

Ensuring the code is **Readable** and easy to read is crucial for maintenance and collaboration. The structure and naming convention within the code are carefully written to improve **readability**.

## Performance

Performance optimizations include debouncing functions to minimize unnecessary renders and using efficient data fetching techniques with **axios interceptors**.

## Conclusion

The design and implementation of this application focus on modularity, reusability, and scalability. By using custom hooks, axios interceptors, and a clear separation of concerns, the application is designed to be robust, maintainable, and easy to extend.

# API Document

## api.ts

These are the core functions which use **axios interceptor** for making HTTP requests:

- **getData(endpoint: string): Promise<any>**: This function retrieves data from the specified endpoint.

- **postData(endpoint: string, data: any): Promise<any>**: This one does a POST request to the specified endpoint with the provided data.

- **putData(endpoint: string, data: any): Promise<any>**: It updates data at the specified resource using PUT method.

- **deleteData(endpoint: string): Promise<any>**: Deletes data on the given endpoint.

## Utility Hook: useDebouncedCallback.ts

A custom hook that is used to delay a callback invocation:

- **useDebouncedCallback**: It gives back a debounced version of callback function, so that unnecessary function calls can be minimized and performance can be enhanced.

## Utility Hook: useOutsideClick.ts

This is a custom hook for detecting outside clicks:

- **useOutsideClick**: It triggers a call to the callback when it detects that there was a click outside of what has been referenced; this is useful in dropdown menus or modals handling.

## Component : index.tsx

The main entry point into this application:

- **App(): JSX.Element**: A root component that sets initial state and renders main components of the application.

## Component : ErrorBoundary.tsx

**Error boundary**:

- **Class ErrorBoundary**: Catches JavaScript errors in child components, logs them, and displays the fallback UI, increasing the robustness of the application.

## Component : DropdownList.tsx

**Dropdown list components**:

- **DropdownList**: Displays a list of selectable items, providing a simple user interface.

## Component : autocomplete.tsx

**Self-completing features**:

- **Autocomplete: JSX.Element**: Provides an input field with a suggestion filter, and enhances the user experience with real-time suggestions.

# Backend Documentation

## Overview

This documentation provides an overview of the backend for a country management system. The backend consists of various TypeScript files, including controllers, services, and utility functions. The primary components are:

- `controllers`: controller functions that handle HTTP requests and responses.
- `countries`: Contains country route.
- `data`: consist country data.
- `services`: Contains the business logic and service functions for various operations.
- `utils`: Utility functions like validations are written.

- `countryController.ts`
- `countryService.ts`
- `route.ts`
- `data.ts`
- `validation.ts`

### `countryController.ts`

The `countryController.ts` file handles HTTP requests related to country operations.

### `countryService.ts`

The `countryService.ts` file contains the business logic for country operations.

### `data.ts`

The `data.ts` consist of country data.

## `getClosestCountriesHandler`

The `getClosestCountriesHandler` function handles HTTP requests to fetch the closest countries based on a specified country and query parameters. It utilizes Next.js API routes and interacts with service and utility functions.

# `getClosestCountries`

The `getClosestCountries` function uses the Haversine formula to calculate distances and can filter countries based on a starting name.

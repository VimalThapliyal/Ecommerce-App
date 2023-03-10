import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      let maxPrice = Math.max(...action.payload.map((p) => p.price));
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    }

    case SET_GRIDVIEW: {
      return { ...state, grid_view: true };
    }

    case SET_LISTVIEW: {
      return { ...state, grid_view: false };
    }

    case UPDATE_SORT: {
      return { ...state, sort: action.payload };
    }

    case SORT_PRODUCTS: {
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: tempProducts };
    }

    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    }

    case FILTER_PRODUCTS: {
      const { all_products } = state;
      const { text, category, color, company, price, shipping } = state.filters;
      let tempProducts = [...all_products];
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }

      // category
      if (category !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.category === category;
        });
      }

      // company
      if (company !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.company === company;
        });
      }

      // colors
      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }

      // price

      tempProducts = tempProducts.filter((p) => p.price <= price);

      // shipping
      if (shipping) {
        tempProducts = tempProducts.filter((p) => p.shipping === true);
      }

      return { ...state, filtered_products: tempProducts };
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
    }

    default:
      return state;
  }
};

export default filter_reducer;

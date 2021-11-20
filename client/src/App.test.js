import { screen, render, waitFor, fireEvent, cleanup, wait  } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "./App";
import Form from './components/pages/CreatePokemon';

afterEach(() => {
    cleanup();
})

describe("App.js render tests", () => {
    it("App renders correctly", () => {
        render(<App />);
        expect(screen.getAllByText("Pokedex")[0]).toBeInTheDocument();
    })
})

describe("Create Pokemon Tests", () => {

    it("Form renders without errors", async () => {
        const { getByTestId } = render(<Form />);
        const header = getByTestId("form-header");
        await expect(header).toHaveTextContent(/create a pokemon!/i);
    })

    it("Expect back button to be disabled on first page", async () => {
        const { getByTestId } = render(<Form />);
        const backButton = getByTestId("back-button");
        await expect(backButton).toBeDisabled();
    })

    it("Expect next button to be enabled on first page", async () => {
        const { getByTestId } = render(<Form />);
        const nextButton = getByTestId("next-button");
        await expect(nextButton).toBeEnabled();
    })

    it("First page form elements should be hidden when next button is clicked", async () => {
        const { getByTestId } = render(<Form />);
        const nextButton = getByTestId("next-button");
        expect(getByTestId("name-form-group")).not.toHaveClass("hidden");
        userEvent.click(nextButton);
        await waitFor(() => {
            expect(getByTestId("name-form-group")).toHaveClass("hidden");
        })
    })

    it("Typing blank space into name input should reveal error", async () => {
        const { getByTestId } = render(<Form />);
        const nameInput = getByTestId("name-input");
        fireEvent.change(nameInput, {target: {value: "  "}})
        expect(nameInput).toHaveValue("  ");
        expect(await screen.findByText("Must Have Name"));     
    })

    it("Form inputs focus when clicked", async () => {
        const { getByTestId } = render(<Form />);
        const nameInput = getByTestId("name-input");
        userEvent.click(nameInput);
        await waitFor(() => {
            expect(nameInput).toHaveFocus();
        })
    })

    it("Asterisk should have appropriate styles", async () => {
        const { getByTestId } = render(<Form />);
        const asterisk = getByTestId("asterisk");
        await expect(asterisk).toHaveStyle({color: "red", fontSize: "20"});
    })

    it("Name form should be blank at start", async () => {
        const { getByTestId } = render(<Form />);
        const nameInput = getByTestId("name-input");
        await expect(nameInput).toHaveValue("");
    })

    it("Navbar text should be visible", async () => {
        render(<Form />);
        expect(screen.getByText(/pokedex/i)).toHaveTextContent(/pokedex/i);
        expect(screen.getByText(/home/i)).toHaveTextContent(/home/i);
    })

    it("Footer text should be visible", async () => {
        render(<Form />);
        expect(screen.getByText(/created by joshua lamke/i)).toHaveTextContent(/created by joshua lamke/i);
        expect(screen.getByText(/powered by/i)).toHaveTextContent(/powered by/i);
    })

})
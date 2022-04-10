describe("login, search for a movie, rate the movie, add a comment", () => {
	it("user can login and interact with the movies", () => {
		cy.visit("http://localhost:3000/");
		//login

		cy.findByRole("button", { name: /login/i }).click({
			force: true,
		});

		cy.get(".username-input")
			.click({
				force: true,
			})
			.type("dimitar");

		cy.get('input[placeholder*="password"]')
			.click({
				force: true,
			})
			.type("test");

		cy.get(".wrapper > form > button").click({
			force: true,
		});

		//search for the movie "godfather"

		cy.get(".bg-gray")
			.click({
				force: true,
			})
			.type("godfather");

		cy.get(".form-container > .flex > .bg-transparent").click({
			force: true,
		});

		//click on the first result

		cy.get(":nth-child(1) > a > img").click({
			force: true,
		});

		// rate the movie 5 stars

		cy.get(
			'[style="position: relative; display: inline-block; vertical-align: middle; padding-left: 7px; cursor: pointer;"] > .widget-svg'
		).click({
			force: true,
		});

		// add a comment "clasic, I love it!"

		cy.get(".comment-section > form > input")
			.click({
				force: true,
			})
			.type("clasic, I love it!");

		cy.get(".comment-section > form > button").click({
			force: true,
		});
	});
});

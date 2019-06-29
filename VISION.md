# The Vision of Anonytics 🔭

Anonytics aims to be an open, secure and privacy focused alternative to the current web analytics solutions on the market. The goal is to deliver useful metrics for product teams, website owners and everything in between, while still maintaining the privacy of the users.

The guiding principle for Anonytics is that **the user's right to not share their personal information comes before the product owner's wish to collect information about the usage of their product**.

That guiding principle is further manifested in the following guide lines

## First Priority Guidelines 1️⃣

1. Every single piece of implicitly collected data must be **anonymized and encrypted** _before_ it leaves the user's device. Data collected using Anonytics must never, directly or indirectly, be able to identify an individual.
2. Every type of user data collection, be it product usage or user information, must be **opt-in for the product developer**. The default is to collect no data at all, and it must be an active choice for the product developer every time they wish to collect more data.
3. The user maintains the right to op out of any collection of data, no matter how anonymous it is.
4. The collection of personal data must be transparent to the user at all times.

## Second Priority Guidelines 2️⃣

1. The data collected by Anonytics should be useful for the product developer, and should be presented in a useful way. If the data is not useful, or cannot be analyzed in a useful way, it should not be collected in the first place.
2. All collected data is owned by the product developer, and not Anonytics, anyone affiliated with Anonytics nor any other third-parties of any kind. The product developer maintains the right to read, delete and aggregate the data at all times, as long as the anonymity and security of the data is maintained.
3. Collecting data should be performant, and should not have a noticable impact on the user's experience or data plan.

## Striking A Balance ⚖️

If you've read this far, congratulations, you should now have a fairly good understanding the guiding principles behing Anonytics. However you might also realize, that some of the guidelines could be contradicting each other.

As an example, it is stated that it must be impossible to indirectly identify a user from the data, but also later stated that the data should be useful. What if a product developer have a great reason for knowing where their users are, should they then be able to collect data about the user's location? Wouldn't that make it possible to identify the user, if they are the only known user on that location? One way of mitigating this, is to limit the precision of the data, like only collecting the user's current country, or even continent. These types of questions haven't been answered yet, but the priority of the guidelines are clear: First Priority Guidelines (those concerning the user's privacy and security) _always_ comes before the Second Priority Guidelines (those concerning the usefulness of Anonytics and the product developer).

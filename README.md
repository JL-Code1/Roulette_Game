User Story

As a user, I want to play an interactive online roulette game where I can place bets, spin the wheel, and track my balance.
So that, I can experience the thrill of casino-style gaming without real money involvement.

Users create an account or log in using their credentials.
Upon logging in, they receive a starting balance to place bets.
Placing Bets

The betting table allows users to select chips and place bets on:
Single numbers
Red/Black
Odd/Even
High/Low
Special bets (dozens, columns, streets, etc.)
The bet amount is deducted from the user's balance before spinning.
Spinning the Roulette Wheel

Users click the "Spin" button, triggering the wheel animation.
The backend processes the bet and randomly selects a winning number.
The winning number is displayed, and the wheel lands accordingly.
Results & Balance Updates

If the user wins, winnings are credited to their balance based on standard roulette payouts.
If the user loses, the balance remains updated with the loss.
The user can review their bet history before placing new bets.
Game Continuation

The user can continue playing with their remaining balance.
If their balance reaches zero, they can reset their account or wait for a daily free chip bonus (future feature).
Overview
The Roulette App is a full-stack MERN (MongoDB, Express, React, Node.js) application that simulates an online roulette game. Players can place bets, spin the wheel, and track their balance.

Features

Core Gameplay
User authentication with balance tracking
Realistic roulette wheel animation
Standard and advanced betting options
Automatic payout calculations
Backend (Node.js, Express, MongoDB, GraphQL)
Secure user authentication using JWT
GraphQL API for handling bets and retrieving data
MongoDB database for storing users and bet history
Frontend (React, Apollo Client)
Interactive UI for betting and spinning
Live balance updates
Apollo Client for managing GraphQL queries and mutations
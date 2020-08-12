from tic_tac_toe import *
from copy import deepcopy

my_board = [
	["1", "2", "X"],
	["4", "5", "6"],
	["7", "8", "9"]
]
# 1.Call print_board() using my_board as a parameter.
print_board(my_board)
# 2.Call select_space() to put an "O" in the center of the board. Print the board again after making this move.
select_space(my_board, 5, "O")
print_board(my_board)
# 3.Make two more moves of your choice and print the available moves. You can make a move with an "X" or an "O"
# Remember, you can use the available_moves() function using my_board as a parameter to get a list of the available moves.
select_space(my_board, 1, "X")
select_space(my_board, 2, "X")
print(available_moves(my_board))
# 4.Make enough moves to win the game as "X". Use has_won() to check to see if "X" has won. Check to see if "O" has won as well. Print both results.
print(has_won(my_board, "X"))
print(has_won(my_board, "O"))
print_board(my_board)

# Detecting Tic-Tac-Toe Leaves
start_board = [
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "8", "9"]
]

x_won = [
	["X", "O", "3"],
	["4", "X", "O"],
	["7", "8", "X"]
]

o_won = [
	["O", "X", "3"],
	["O", "X", "X"],
	["O", "8", "9"]
]

tie = [
	["X", "X", "O"],
	["O", "O", "X"],
	["X", "O", "X"]
]
# 1.At the bottom of script.py, create a function called game_is_over() that takes a board as a parameter. The function should return True if the game is over and False otherwise.
def game_is_over(board):
  	return has_won(board, "X") or has_won(board, "O") or len(available_moves(board)) == 0
# 2.We’ve given you four different boards to test your function. Call game_is_over() on the boards start_board, x_won, o_won, and tie. Print the result of each.
print(game_is_over(start_board))
print(game_is_over(x_won))
print(game_is_over(o_won))
print(game_is_over(tie))
# 3.Let’s write another function called evaluate_board() that takes board as a parameter. This function will only ever be called if we’ve detected the game is over. The function should return a 1 if "X" won, a -1 if "O" won, and a 0 otherwise.
def evaluate_board(board):
	if has_won(board, "X"):
		return 1
	elif has_won(board, "O"):
		return -1
	else:
		return 0
# 4.Test your function on the four different boards! For each board, write an if statement checking if the game is over. If it is, evaluate the board and print the result. You just wrote the base case of the minimax algorithm!
if (game_is_over(start_board)):
  	print(evaluate_board(start_board))
if (game_is_over(x_won)):
  	print(evaluate_board(x_won))
if (game_is_over(o_won)):
  	print(evaluate_board(o_won))
if (game_is_over(tie)):
  	print(evaluate_board(tie))


# Copying Boards
# my_board = [
# 	["1", "2", "X"],
# 	["4", "5", "6"],
# 	["7", "8", "9"]
# ]

# 1.Let’s begin by failing to create a deep copy of my_board. Create a variable named new_board and set it equal to my_board.
# 3.Change how you create new_board. Set it equal to deepcopy(my_board). What happens when you call select_space() now?
new_board = deepcopy(my_board)
# 2.Call the select_space() function using new_board as a parameter to put an "O" in the center of the board. Print out both new_board and my_board using print_board() to see if making a move on the new board affected the old board.
select_space(new_board, 5, "O")
print_board(new_board)
print_board(my_board)


# The Minimax Function
x_winning = [
	["X", "2", "O"],
	["4", "O", "6"],
	["7", "8", "X"]
]

# def game_is_over(board):
#   	return has_won(board, "X") or has_won(board, "O") or len(available_moves(board)) == 0

# def evaluate_board(board):
# 	if has_won(board, "X"):
# 		return 1
# 	elif has_won(board, "O"):
# 		return -1
# 	else:
# 		return 0

# Recursion In Minimax		
new_game = [	
	["1", "2", "3"],	
	["4", "5", "6"],	
	["7", "8", "9"]	
]	
# x_winning = [	
# 	["X", "2", "O"],	
# 	["4", "O", "6"],	
# 	["7", "8", "X"]	
# ]	
o_winning = [	
	["X", "X", "O"],	
	["4", "X", "6"],	
	["7", "O", "O"]	
]

def minimax(input_board, is_maximizing):
	# Base case - the game is over, so we return the value of the board
	if game_is_over(input_board):
		# return evaluate_board(input_board)
		# Which Move?
		# 1.Instead of returning just the value, we’re going to return a list that looks like [best_value, best_move].
		# We haven’t kept track of the best move yet, so for now, let’s change both of our return statements to be [best_value, ""]. This includes the base case! The base case should return [evaluate_board(input_board), ""]
		# We also need to make sure when we’re setting hypothetical_value, we’re setting it equal to the value — not the entire list. The recursive call should now look like this.
		# minimax(new_board, not is_maximizing)[0]
		return [evaluate_board(input_board), ""]
  	best_move = ""
	# 1.We’ve started the minimax() function for you and included the base case we wrote a few exercises ago.
	# We now need to define what should happen if the node isn’t a leaf.
	# We’ll want to set up some variables that are different depending on whether is_maximizing is True or False.
	# Below the base case, write an if statement to check if is_maximizing is True.
	# Inside the if statement, create a variable named best_value. Since we’re working with the maximizing player right now, this is the variable that will keep track of the highest possible value from all of the potential moves.
	# Right now, we haven’t looked at any moves, so we should start best_value at something lower than the lowest possible value — -float("Inf").
	# Write an else statement. Inside this else statement we’ll be setting up variables for the minimizing player. In this case, best_value should start at float("Inf").
	# Return best_value after the else statement.
	if is_maximizing == True:
		best_value = -float("Inf")
		symbol = "X"
	else:
		best_value = float("Inf")
		symbol = "O"
	# 2.We now want to loop through all of the possible moves of input_board before the return statement. We’re looking to find the best possible move.
	# Remember, you can get all of the possible moves by calling available_moves() using input_board as a parameter.
	# After the else statement, but before you return best_value, loop through all of the possible moves and print each move.
	# Let’s call our function to see these print statements. Outside of your function definition, call minimax() using the parameters x_winning (the board we’re using) and True (we’re calling it as the maximizing player).
	for move in available_moves(input_board):
		# print(move)
		# 3.Delete the print statements for move. Rather than just printing the move in this for loop, let’s create a copy of the game board and make the move!
		# Inside the for loop, create a deepcopy of input_board named new_board.
		# Apply the move to new_board by calling the select_space() function. select_space() takes three parameters.
		# The board you want to use (new_board)
		# The space you’re selecting (the move from the for loop)
		# The symbol you’re filling the space in with. This is different depending on whether we’re the maximizing or minimizing player. In your if and else statements, create a variable named symbol. symbol should be "X" if we’re the maximizing player and "O" if we’re the minimizing player. Use symbol as the third parameter of select_space().
		# To help us check if you accurately made the move, return new_board outside the for loop (instead of returning best_move). We’ll fix that return statement soon!
		new_board = deepcopy(input_board)
		select_space(new_board, move, symbol)
		# Recursion In Minimax
		# 1.Let’s make that recursive call!
		# Inside the for loop after calling select_space(), create a variable named hypothetical_value and set it equal to minimax() using the parameters new_board and not is_maximizing.
		# To help us check if you did this correctly, return hypothetical_value instead of best_value. We’ll change that return statement soon!
		hypothetical_value = minimax(new_board, not is_maximizing)[0]
		# 2.Now that we have hypothetical_value we want to see if it is better than best_value.
		# Inside the for loop, write another set of if/else statements checking to see if is_maximizing is True or False
		# If is_maximizing is True, then best_value should become the value of hypothetical_value if hypothetical_value is greater than best_value.
		# If is_maximizing is False, then best_value should become the value of hypothetical_value if hypothetical_value is less than best_value.
		# Switch your return statements back to returning best_value.
		if is_maximizing == True and hypothetical_value > best_value:
			best_value = hypothetical_value
			# 2.Let’s now keep track of which move was best.
			# Right after the base case, create a variable named best_move. Set it equal to the empty string ("")
			# For both the maximizing case and the minimizing case, if we’ve found a new best_value, we should also update best_move. Inside those two if statements, set best_move equal to your variable from your for loop (ours is named move). We’re now remembering which move goes with the best possible value.
			# Change your last return statement. Instead of returning [best_value, ""], return [best_value, best_move].
			best_move = move
		if is_maximizing == False and hypothetical_value < best_value:
			best_value = hypothetical_value
			best_move = move
	# return new_board
	# return best_value
	return [best_value, best_move]
# 3.Wow! Great work, our minimax function is done. We’ve set up a couple of boards for you. Call minimax() three different times on the boards x_winning, and o_winning. In each of those boards, it’s "X"‘s turn, so set is_maximizing to True.
# Print the results of each. What does it mean if the result is a -1, 0 or 1?
# You can also try running minimax() on new_game. This might take a few seconds — the algorithm needs to traverse the entire game tree to reach the leaves!
print(minimax(x_winning, True)) 	# This should return [1, 7]. This means that "X" should be able to win the game if they select move 7.
print(minimax(o_winning, True))		# This should return [-1, 4]. This means that no matter what "X" does, "O" will win. "X" might as well select move 4.

# Play a Game
while not game_is_over(my_board):
	select_space(my_board, minimax(my_board, True)[1], "X")
	print_board(my_board)
	if not game_is_over(my_board):
		select_space(my_board, minimax(my_board, False)[1], "O")
		print_board(my_board)



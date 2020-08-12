from connect_four import *

# 1.We’ve imported a Connect Four game engine along with a board that’s in the middle of a game.
# To start, let’s call the print_board() function using half_done as a parameter.
print_board(half_done)
# 2.Call the tree_size() function using half_done and "X" as parameters. Print the result. This will show you the number of game states in the tree, assuming half_done is the root of the tree and it is "X"‘s turn.
print(tree_size(half_done, 'X'))
# 3.Let’s make a move and see how the size of the tree changes. Let’s place an "X" in column 6. Before calling the tree_size() function, call the select_space() function with the following three parameters:
#   half_done — The board that you’re making the move on.
#   6 — The column you’re selecting.
#   "X" — The type of piece you’re putting in column 6.
# Since "X" has taken their turn, it is now "O"‘s turn. Change the second parameter in the tree_size() function to be "O".
select_space(half_done, 6, "X")
print(tree_size(half_done, "O"))


# Depth and Base Case
import random
random.seed(108)

new_board = make_board()
# 1.We’ve given you a minimax() function that recurses to the leaves. Edit it so it has a third parameter named depth.
# Change the recursive call to decrease depth by 1 each time.
# Change your base case — the recursion should stop when the game is over or when depth is 0.

# Implement Alpha-Beta Pruning
# 1.Add two new parameters named alpha and beta to your minimax() function as the final two parameters. Inside your minimax() function, when you the recursive call, add alpha and beta as the final two parameters.
def minimax(input_board, is_maximizing, depth, alpha, beta):
    # Base case - the game is over, so we return the value of the board
    if game_is_over(input_board) or depth == 0:
        return [evaluate_board(input_board), "", alpha, beta]
    best_move = ""
    if is_maximizing == True:
        best_value = -float("Inf")
        symbol = "X"
    else:
        best_value = float("Inf")
        symbol = "O"
    for move in available_moves(input_board):
        new_board = deepcopy(input_board)
        select_space(new_board, move, symbol)
        hypothetical_value = minimax(new_board, not is_maximizing, depth - 1, alpha, beta)[0]    #Add a third parameter to this recursive call
        if is_maximizing == True and hypothetical_value > best_value:
            best_value = hypothetical_value
            best_move = move
            # 2.After resetting the value of best_value if is_maximizing is True, we want to check to see if we should reset alpha. Set alpha equal to the maximum of alpha and best_value. You can do this quickly by using the max() function. For example, the following line of code would set a equal to the maximum of b and c.
            # a = max(b, c)
            # Change both returns statements to include alpha as the last item in the list. For example, the base case return statement should be [evaluate_board(input_board), "", alpha].
            # Note that this third value in the return statement is not necessary for the algorithm — we need the value of alpha so we can check to see if you did this step correctly!
            alpha = max(alpha, best_value)
        if is_maximizing == False and hypothetical_value < best_value:
            best_value = hypothetical_value
            best_move = move
            # 3.If we reset the value of best_value and is_maximizing is False, we want to set beta to be the minimum of beta and best_value. You can use the min() function this time.
            # In both return statements, add beta as the last item in the list. This is once again unnecessary for the algorithm, but we need it to check your code!
            beta = min(beta, best_value)
        # 4.At the very end of the for loop, check to see if alpha is greater than or equal to beta. If that is true, break which will cause your program to stop looking through the remaining possible moves of the current game state.
        if alpha > beta:
            break
    return [best_value, best_move, alpha, beta]

# 5.We’re going to call minimax() on board, but before we do let’s see what board looks like. Call print_board using board as a parameter.
print_board(board)
# 6.Call minimax() on board as the maximizing player and print the result. Set depth equal to 6. alpha should be -float("Inf") and beta should be float("Inf").  
print(minimax(board, True, 6, -float("Inf"), float("Inf")))

# 2.Outside the function, call minimax() on new_board as the maximizing player with a depth of 3 and print the results. Remember, minimax() returns a list of two numbers. The first is the value of the best possible move, and the second is the move itself.
print(minimax(new_board, True, 3))

# Evaluation Function
def evaluate_board(board):
    if has_won(board, "X"):
        return float("Inf")
    elif has_won(board, "O"):
        return -float("Inf")
    # 1.Let’s rewrite our evaluation function for Connect Four. We’ll be editing the part of the evaluation function under the else statement. We need to define how to evaluate a board when nobody has won.
    # Let’s write a slightly silly evaluation function that prioritizes having the top piece of a column. If the board looks like the image below, we want our evaluation function to return 2 since the maximizing player ("X") has two more “top pieces” than "O".
    # For now, inside the else statement, delete the current return statement. Create two variables named num_top_x and num_top_o and start them both at 0. Return num_top_x - num_top_o.
    else:
        num_top_x = 0
        num_top_o = 0
        # 2.Before this new return statement, loop through every column in board. Inside that loop, loop through every square in column. You’re now looking at every square in every column going from top to bottom.
        # If square equals "X" add one to num_top_x and then break the inner for loop to go to the next column.
        for col in board:
            for square in col:
                if square == "X":
                    num_top_x += 1
                    break
                # 3.If square equals "O" add one to num_top_o and then break the inner for loop to go to the next column.
                elif square == "O":
                    num_top_o += 1
                    break
        
        return num_top_x - num_top_o
# 4.We’ve imported three boards for you to test this function. We should first get an understanding of what these three boards look like.
# Note that these boards aren’t game states you’d find in real games of Connect Four — "X" has been taking some extra turns. Nevertheless, we can still evaluate them!
# Call print_board once per board — board_one, board_two, and board_three. What should the evaluation function return for those three boards?    
print_board(board_one)
print_board(board_two)
print_board(board_three)
# 5.Call evaluate_board once on each board and print the results. Did we trick you with board_three?
print(evaluate_board(board_one))
print(evaluate_board(board_two))
print(evaluate_board(board_three))
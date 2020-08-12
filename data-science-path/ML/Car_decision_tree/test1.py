load_file_in_context('script.py')

try:
  car
except NameError:
  fail_tests("Make sure to define `car`.")

if not isinstance(car, list):
  fail_tests("`car` should be a list.")
  
if len(car) != 6:
  fail_tests("`car` should be a list of 6 items.")
  
if car[0] not in ["vhigh", "high", "med", "low"]:
  fail_tests('The first item in `car` should be `"vhigh"`, `"high"`, `"med"`, or `"low"`.')
  
if car[1] not in ["vhigh", "high", "med", "low"]:
  fail_tests('The second item in `car` should be `"vhigh"`, `"high"`, `"med"`, or `"low"`.')  
  
if car[2] not in ["2", "3", "4", "5more"]:
  fail_tests('The third item in `car` should be `"2"`, `"3"`, `"4"`, or `"5more"`. Make sure it\'s a String!')
  
if car[3] not in ["2", "4", "more"]:
  fail_tests('The fourth item in `car` should be `"2"`, `"4"`, or `"more"`. Make sure it\'s a String!')
  
if car[4] not in ["small", "med", "big"]:
  fail_tests('The fifth item in `car` should be `"small"`, `"med"`, or `"big"`.')
  
if car[5] not in ["low", "med", "high"]:
  fail_tests('The sixth item in `car` should be `"low"`, `"med"`, or `"high"`.')

pass_tests()
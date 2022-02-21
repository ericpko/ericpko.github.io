# Looping diagonally

Suppose you're given a matrix $\mathbf{A} \in \mathbb{R}^{m \times n}$ and you 
want to iterate diagonally starting from $a_{11}$ down to $a_{mn}$. We'll assume 
in this example that we're starting from index $(1, 1)$ and we'll change that 
later to start from $(0, 0)$.


\[
\mathbf{A} =   \begin{bmatrix}
                  a_{11} & a_{12} & \dots & a_{1n} \\
                  a_{21} & a_{22} & \dots & a_{2n} \\
                  \vdots & \vdots & \ddots & \vdots \\
                  a_{m1} & a_{m2} & \dots & a_{mn}
               \end{bmatrix}
\]

So let's say we want to iterate 
$a_{11}, a_{21}, a_{12}, a_{31}, a_{22}, a_{13}, \dots, a_{mn}$. Let's take a look
at an example where $m = 5$ and $n = 6$:

\[
\mathbf{A} =   \begin{bmatrix}
                  a_{11} & a_{12} & a_{13} & a_{14} & a_{15} & a_{16} \\
                  a_{21} & a_{22} & a_{23} & a_{24} & a_{25} & a_{26} \\
                  a_{31} & a_{32} & a_{33} & a_{34} & a_{35} & a_{36} \\
                  a_{41} & a_{42} & a_{43} & a_{44} & a_{45} & a_{46} \\
                  a_{51} & a_{52} & a_{53} & a_{54} & a_{55} & a_{56}
               \end{bmatrix}
\]

\begin{gathered}
a_{11} \\
a_{21} a_{12} \\
a_{31} a_{22} a_{13} \\
a_{41} a_{32} a_{23} a_{14} \\
a_{51} a_{42} a_{33} a_{24} a_{15} \\
a_{52} a_{43} a_{34} a_{25} a_{16} \\
a_{53} a_{44} a_{35} a_{26} \\
a_{54} a_{45} a_{36} \\
a_{55} a_{46} \\
a_{56}
\end{gathered}

Notice a pattern? There's actually at least two patterns going on here: 
across each row of $a_{ij}$
index $i$ is decreasing and index $j$ is increasing. Notice anything else? 
The sum of the
indices across each row is constant! The smallest constant is 
when $(i, j) = (1, 1)$ is $2$ and the largest constant is when $(i, j) = (5, 6)$ is $11$. 
Thus, we'll want an
outter loop that tracks the index constant $k$ for each row and stops when the constant
$k >= 12$.


### Solution 1: Indices starting at (1, 1)

```python
for k in range(2, m + n + 1):
   for j in range(1, k):
      i = k - j
      # Now we need to check the bounds because as the constant k grows
      # past m, that means i will be greater than m sometimes and j will
      # be greater than n sometimes.
      if i <= m and j <= n:
         # Safe to access A
         A[i][j]
         # ...
```


Now let's take the previous example and assume that the indices start at $(i, j) = (0, 0)$
and end at $(m - 1, n - 1)$. Then our smallest constant value is $k = 0$ at $(0, 0)$ and
the largest constant value is 

\begin{aligned}
k &= m - 1 + n - 1 \\
  &= m + n - 2
\end{aligned}



### Solution 2: Indices starting at (0, 0)

```python
for k in range(m + n):
   for j in range(k + 1):
      i = k - j
      # Now we need to check the bounds
      if i < m and j < n:
         # Safe to access A
         A[i][j]
         # ...
```

Now you may have noticed something subtle about these solutions: is it necessary to
check the bounds? It's seems like we're doing more work than we need to after the
constant $k$ reaches the minimum of $m$ and $n$ because after this point, some of
the indices will be out of bounds. There is a solution to the problem, one in which
we don't need to check the index bounds, but the cost is that we have to split the
loop into a top half and a bottom half. 

!!! todo "TODO"
    [finish this case](https://stackoverflow.com/questions/20420065/loop-diagonally-through-two-dimensional-array/20422854).



## Starting from bottom left corner
What if we wanted to loop through the matrix starting from the bottom left corner?
That is, from $(m, 1)$ to $(1, n)$:

$$
\mathbf{A} =   \begin{bmatrix}
                  a_{11} & a_{12} & a_{13} & a_{14} & a_{15} & a_{16} \\
                  a_{21} & a_{22} & a_{23} & a_{24} & a_{25} & a_{26} \\
                  a_{31} & a_{32} & a_{33} & a_{34} & a_{35} & a_{36} \\
                  a_{41} & a_{42} & a_{43} & a_{44} & a_{45} & a_{46} \\
                  a_{51} & a_{52} & a_{53} & a_{54} & a_{55} & a_{56}
               \end{bmatrix}
$$

Taking the previous example, let's see if we can find a pattern.

\begin{gather}
a_{51} \\
a_{41} a_{52} \\
a_{31} a_{42} a_{53} \\
a_{21} a_{32} a_{43} a_{54} \\
a_{11} a_{22} a_{33} a_{44} a_{55} \\
a_{12} a_{23} a_{34} a_{45} a_{56} \\
a_{13} a_{24} a_{35} a_{46} \\
a_{14} a_{25} a_{36} \\
a_{15} a_{26} \\
a_{16}
\end{gather}

In this case, our sum of indices $i + j$ are no longer constant along each row.
They do however increase by two as we move along a row. In any case, there
is a clever solution we can use by adding just one line to our original solution
and adding an extra bound check:

### Solution: Indices starting at (1, 1)
```python
for k in range(2, m + n + 1):
   for j in range(1, k):
      i = k - j
      i = m + 1 - i                  # reflect i

      if i >= 0 and i <= m and j <= n:
         # Safe to access A
         A[i][j]
         # ...
```



<!-- $$
\mathbf{A} =   \begin{bmatrix}
                  a_{00} & a_{01} & \dots & a_{0,n-1} \\
                  a_{10} & a_{11} & \dots & a_{1,n-1} \\
                  \vdots & \vdots & \ddots & \vdots \\
                  a_{m-1,0} & a_{m-1,1} & \dots & a_{m-1,n-1}
               \end{bmatrix}
$$ -->

# Accessing RBG values from a 1D image array

Suppose you're given an image with $n_x$ pixels wide and $n_y$ pixels high.
This image has dimensions $n_x \times n_y$ in pixels. Now suppose you're
given a flattened (row-major ordered) 1D array `img_1D` containing this image 
and you want to access the individual *rgb* subpixels:


```python
for j in range(n_y):                      # for y in 0..height
   for i in range(n_x):                      # for x in 0..width
      r = img_1D[3 * (j * n_x + i) + 0]
      g = img_1D[3 * (j * n_x + i) + 1]
      b = img_1D[3 * (j * n_x + i) + 2]
      # ...
      # do stuff with rgb values
      # ...
```


Before we break down that weird index, let's just describe how we're iterating
over the image. Our outter loop is starting from $0$ and increasing along the $y$
axis and our inner loop is starting from $0$ and increasing along the $x$ axis.
In other words, we're starting from the bottom left pixel of the image and moving
across each row, then up one column and repeating.

Now let's see what's happening with the index.
We'll start with the number in brackets: $(j * n_x + i)$. Imagine our 
[2D image](http://ericpko.github.io/loop/problems/raster-graphics/01-raster-images/#where-are-the-pixels-in-2d-space)
in the cartesian plane and we're given pixel $(i, j)$, which is at column $i$
and row $j$. What we need is a mapping from the 2D image space to our 1D array space.
Since our 2D image is flattened into a 1D array, and since we know our position $(i, j)$
in the 2D image, we can create a mapping $T$ from $\mathbb{R^2} \rightarrow \mathbb{R}$.
Thus, we know at least two mappings: 


\[
T \left(
   \begin{bmatrix}
   i \\
   j
   \end{bmatrix}
\right)
=
T \left(
   \begin{bmatrix}
   1 \\
   0
   \end{bmatrix}
\right)
= 1
\]

and

$$
T \left(
   \begin{bmatrix}
   i \\
   j
   \end{bmatrix}
\right)
=
T \left(
   \begin{bmatrix}
   n_x - 1 \\
   n_y - 1
   \end{bmatrix}
\right)
= n_x n_y - 1
$$

This is just saying that $(i, j) = (1, 0)$ should be mapped to index $1$ in the
1D array and $(i, j) = (n_x - 1, n_y - 1)$ should be mapped to the last index
in the 1D array: $n_x n_y - 1$. Now our goal is to find a general formula for
the mapping

$$
T \left(
   \begin{bmatrix}
   i \\
   j
   \end{bmatrix}
\right)
$$

Let's assume that $T(\mathbf{x}) = \mathbf{A} \mathbf{x}$ for all $\mathbf{x} \in \mathbb{R^2}$.
Now our goal can be rephrased to finding a matrix $\mathbf{A}$, whose size we can infer
will be $1 \times 2$. So let's start by computing


\begin{aligned}
& \mathbf{A} \begin{bmatrix}
   1 & n_x - 1 \\
   0 & n_y - 1
\end{bmatrix} \\
&= \begin{bmatrix}
   \mathbf{A}
   \begin{bmatrix}
      1 \\
      0
   \end{bmatrix}
   &
   \mathbf{A}
   \begin{bmatrix}
      n_x - 1 \\
      n_y - 1
   \end{bmatrix}
\end{bmatrix} \\
&= \begin{bmatrix}
   T \left(
   \begin{bmatrix}
      1 \\
      0
   \end{bmatrix}
   \right )
   &
   T \left(
   \begin{bmatrix}
      n_x - 1 \\
      n_y - 1
   \end{bmatrix}
   \right)
\end{bmatrix} \\
&= \begin{bmatrix}
      1 & n_x n_y - 1
\end{bmatrix}
\end{aligned}



Now we find the inverse matrix of

$$
\begin{bmatrix}
   1 & n_x - 1 \\
   0 & n_y - 1
\end{bmatrix}^{-1}
= 
\frac{1}{n_y - 1} \begin{bmatrix}
                     n_y - 1 & 1 - n_x \\
                     0 & 1
                  \end{bmatrix}
$$

And now we can solve for $\mathbf{A}$ since we have 
$\mathbf{A} \mathbf{B} \mathbf{B}^{-1} = \mathbf{A} \mathbf{I} = \mathbf{A}$:

\begin{aligned}
\mathbf{A} &= \begin{bmatrix}
               1 & n_x n_y - 1
             \end{bmatrix}
             \begin{bmatrix}
               1 & \frac{1 - n_x}{n_y - 1} \\
               0 & \frac{1}{n_y - 1}
             \end{bmatrix} \\
         &= \begin{bmatrix}
               1 & \frac{1 - n_x}{n_y - 1} + \frac{n_x n_y - 1}{n_y - 1}
            \end{bmatrix} \\
         &= \begin{bmatrix}
               1 & \frac{n_x n_y - n_x}{n_y - 1}
           \end{bmatrix} \\
         &= \begin{bmatrix}
               1 & \frac{n_x(n_y -1)}{n_y - 1}
           \end{bmatrix} \\
         &= \begin{bmatrix}
               1 & n_x
           \end{bmatrix}
\end{aligned}


and this is exactly our linear transformation:

\begin{aligned}
T \left (
      \begin{bmatrix}
         i \\
         j
      \end{bmatrix}
  \right ) &=
  \mathbf{A}
      \begin{bmatrix}
         i \\
         j
      \end{bmatrix} \\
   &= \begin{bmatrix}
         1 & n_x
      \end{bmatrix}
      \begin{bmatrix}
         i \\
         j
      \end{bmatrix} \\
      &= i + n_x j \\
      &= j * n_x + i
\end{aligned}



This is of course extreme overkill for our simple problem, when intuitively
we can just imagine that the $j * n_x$ term shifts $j$ times the width of the image
upwards in the $y$ axis, and the $i$ term shifts us in the $x$ direction.
So now that we have our 2D to 1D mapping, we can follow the same logic to 
understand the other terms of our index: $3 * (j * n_x + i) + s$, where 
$s = 0, 1$ or $2$.
Since we know our image is colored and has rgb subpixel values, we need to shift our
pixel index $(j * n_x + i)$ by $3$ since each pixel has $3$ subpixels. Then
to access an individual subpixel, we need an offset of $0$ to access red,
$1$ to access green, and $2$ to access blue.

Some image formats store an alpha $\alpha$ value which controls the opacity.
Using our logic from above, it's easy to generalize to the case in which
we wanted to access the alpha value from an *rgba* image:

```python
alpha = img_1D[4 * (j * n_x + i) + 3]
```

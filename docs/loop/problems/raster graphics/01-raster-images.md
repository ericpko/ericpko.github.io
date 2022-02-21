# What are raster images?

## Raster images
A raster image is a 2D array or matrix that stores a *pixel value* for each pixel.
If the image is colored, then each pixel is usually stored as a 3D vector of numbers
that represent values for red, green, and blue. These *rgb* values are commonly 
referred to as **subpixels**. If the image is not colored, then each pixel stores
a single value which controls the brightness of that pixel and the image is called grayscale.

## Where are the pixels in 2D space?
This is an important question, but it's really just a matter of convention.
For instance, some references count pixel positions $(i, j)$ starting from the upper
left corner similar to a matrix:

\[
\mathbf{A} = 
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
\]

Reasons for this are historical and have to do with the way that rows in analog 
television transmissions started from the top left. In any case, we'll set our raster 
image inside a cartesian plane such that when we refer to pixel $(i, j)$, we are
saying that this pixel lives at column $i$ and row $j$ starting from the bottom left corner:

<!-- ![Placeholder](../../assets/raster-image.jpg) -->

<figure>
  <img src="/assets/images/raster-image.jpg" />
  <figcaption>Fundamentals of Computer Graphics, 4th edition</figcaption>
</figure>


In the image shown above, we can say that there are $(n_x \times n_y) = (4 \times 3)$ pixels.

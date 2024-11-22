namespace BlogManagement.Helpers
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Proceed to the next middleware or request pipeline
                await _next(context);
            }
            catch (Exception ex)
            {
                // Handle exceptions and write the response
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            // Log the exception (optional)
            Console.WriteLine($"Exception: {exception.Message}");

            // Customize the response
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var errorResponse = new
            {
                StatusCode = context.Response.StatusCode,
                Message = "An internal server error occurred.",
                Detailed = exception.Message // Optional: include for debugging; avoid in production
            };

            return context.Response.WriteAsJsonAsync(errorResponse);
        }
    }
}

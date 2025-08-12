import "./App.css";
import Button from "./components/ui/Button";
import Input from "./components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/Card";
// import { Label } from "./components/ui/Label";

function App() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">
        Neobrutalism Component Test
      </h1>

      <div className="space-y-4 flex gap-2">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="neutral">Neutral Button</Button>
        <Button variant="success">Success Button</Button>
        <Button variant="danger">Danger Button</Button>
        <Button variant="outline">Outline Button</Button>
      </div>

      <div className="mt-8 space-y-4 max-w-md">
        <Input placeholder="Enter your name..." />
        <Input type="email" placeholder="Enter your email..." />
        <Input type="password" placeholder="Enter your password..." />
        <Input disabled placeholder="Disabled input..." />
      </div>

      <div className="mt-8 flex justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-start leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Login to your account
            </CardTitle>
            <CardDescription className="text-sm  text-start leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-start leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email..."
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Password
                    </label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Enter your password..."
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              variant="neutral"
              type="submit"
              className="w-full">
              Login
            </Button>
            <Button className="w-full">Register</Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default App;

// App.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import zxcvbn from "zxcvbn";
import SHA1 from "crypto-js/sha1";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [breachStatus, setBreachStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
    setBreachStatus(null);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  const analyzePasswordStrength = useCallback(() => {
    if (!password) return;

    const result = zxcvbn(password);
    setStrength(result.score);

    if (result.feedback.suggestions.length > 0) {
      setFeedback(result.feedback.suggestions[0]);
    } else if (result.score < 3) {
      setFeedback("Add more characters or complexity");
    } else {
      setFeedback("Strong password! Good job!");
    }
  }, [password]);

  const checkPasswordBreach = async () => {
    if (!password) return;

    setIsChecking(true);
    try {
      // Create SHA-1 hash of the password
      const hash = SHA1(password).toString().toUpperCase();
      const prefix = hash.substring(0, 5);
      const suffix = hash.substring(5);

      const response = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`
      );
      const data = await response.text();

      if (data.includes(suffix)) {
        setBreachStatus("breached");
      } else {
        setBreachStatus("safe");
      }
    } catch (error) {
      setBreachStatus("error");
      console.error("Breach check failed:", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  useEffect(() => {
    if (password) {
      analyzePasswordStrength();
    }
  }, [password, analyzePasswordStrength]);

  const getStrengthColor = () => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Calculating...";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h1 className="text-3xl font-bold text-center text-white">
            Password Generator
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Generate secure passwords with enhanced safety checks
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="flex rounded-lg overflow-hidden shadow-lg">
                <input
                  type="text"
                  value={password}
                  className="outline-none w-full p-4 px-5 bg-white text-gray-800 text-lg font-mono"
                  placeholder="Generating password..."
                  readOnly
                  ref={passwordRef}
                />
                <button
                  onClick={copyPasswordToClipboard}
                  className={`outline-none px-5 font-medium shrink-0 transition-colors ${
                    copied
                      ? "bg-green-600"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white`}
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={passwordGenerator}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-4 py-3 rounded-lg shadow transition-all"
              >
                Regenerate
              </button>
              <button
                onClick={checkPasswordBreach}
                disabled={isChecking}
                className={`font-medium px-4 py-3 rounded-lg shadow transition-all ${
                  isChecking
                    ? "bg-gray-500 text-gray-200"
                    : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                }`}
              >
                {isChecking ? "Checking..." : "Check Breach"}
              </button>
            </div>
          </div>

          {breachStatus && (
            <div
              className={`mb-6 p-4 rounded-lg text-white font-medium ${
                breachStatus === "breached"
                  ? "bg-red-600"
                  : breachStatus === "safe"
                  ? "bg-green-600"
                  : "bg-yellow-600"
              }`}
            >
              {breachStatus === "breached" ? (
                <div className="flex items-center">
                  <span className="text-xl mr-2">⚠️</span>
                  <span>
                    This password has been compromised in data breaches!
                  </span>
                </div>
              ) : breachStatus === "safe" ? (
                <div className="flex items-center">
                  <span className="text-xl mr-2">✓</span>
                  <span>
                    This password hasn't been found in any known breaches
                  </span>
                </div>
              ) : (
                <div>Error checking breach status. Please try again.</div>
              )}
            </div>
          )}

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300 font-medium">
                Password Strength:
              </span>
              <span className="font-semibold text-gray-100">
                {getStrengthLabel()}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full ${getStrengthColor()}`}
                style={{ width: `${(strength + 1) * 20}%` }}
              ></div>
            </div>
            {feedback && (
              <p className="text-sm text-gray-400 italic mt-2">
                Suggestion: {feedback}
              </p>
            )}
          </div>

          <div className="bg-gray-700/50 rounded-xl p-5">
            <h2 className="text-xl font-bold text-gray-200 mb-4">
              Password Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="lengthRange" className="text-gray-300">
                    Password Length:{" "}
                    <span className="font-bold text-white">{length}</span>
                  </label>
                  <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {length <= 8 ? "Short" : length <= 12 ? "Good" : "Strong"}
                  </span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={32}
                  value={length}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  onChange={(e) => setLength(e.target.value)}
                />

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">6 chars</span>
                  <span className="text-gray-400">32 chars</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={numberAllowed}
                      onChange={() => setNumberAllowed((prev) => !prev)}
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                  <span className="text-gray-300">Include Numbers</span>
                </div>

                <div className="flex items-center gap-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={charAllowed}
                      onChange={() => setCharAllowed((prev) => !prev)}
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                  <span className="text-gray-300">
                    Include Special Characters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

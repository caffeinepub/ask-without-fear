import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  BookMarked,
  BookOpen,
  CheckCircle,
  Clock,
  Code2,
  ExternalLink,
  GraduationCap,
  Home,
  Info,
  Key,
  Lightbulb,
  ListChecks,
  Loader2,
  Menu,
  MessageSquare,
  Search,
  Send,
  Star,
  StepForward,
  TestTube,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  type Doubt,
  useAllDoubts,
  useAnswerDoubt,
  useAnsweredDoubts,
  useSubmitDoubt,
} from "./hooks/useQueries";

const CATEGORIES = [
  "Math",
  "Science",
  "Computer Science",
  "English",
  "History",
  "Other",
];

const CATEGORY_COLORS: Record<string, string> = {
  Math: "bg-sunshine/20 text-yellow-800 border-sunshine/40",
  Science: "bg-mint/20 text-green-800 border-mint/40",
  "Computer Science": "bg-skyblue/20 text-blue-800 border-skyblue/40",
  English: "bg-lavender/20 text-purple-800 border-lavender/40",
  History: "bg-coral/20 text-orange-800 border-coral/40",
  Other: "bg-muted text-muted-foreground border-border",
};

function formatTime(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// NavBar
// ---------------------------------------------------------------------------
function NavBar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#ask", label: "Ask a Doubt", icon: Search },
    { href: "#library", label: "Doubt Library", icon: BookOpen },
    { href: "#teachers", label: "Teachers", icon: Users },
    { href: "#about", label: "About", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2"
          data-ocid="nav.link"
        >
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </span>
          <span className="font-display font-bold text-xl text-foreground">
            AskFreely
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              data-ocid="nav.link"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  data-ocid="nav.link"
                >
                  <l.icon className="w-4 h-4" />
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Knowledge Base
// ---------------------------------------------------------------------------
interface KnowledgeTopic {
  id: string;
  title: string;
  category: string;
  definition: string;
  steps: string[];
  keyPoints: string[];
  examples: string[];
  resources: { label: string; url: string }[];
}

const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // ---- MATH ---------------------------------------------------------------
  {
    id: "math-addition",
    title: "Addition",
    category: "Math",
    definition:
      "Addition is the mathematical operation of combining two or more numbers to get a total called the sum. It is one of the four basic arithmetic operations and is the foundation of all mathematics.",
    steps: [
      "Write the numbers to be added, aligning digits by place value (ones under ones, tens under tens, etc.).",
      "Start from the rightmost column (ones place) and add each digit.",
      "If the sum of a column is 10 or more, write the ones digit and carry the tens digit to the next column.",
      "Continue left until all columns are added.",
      "Write the final sum below the line.",
    ],
    keyPoints: [
      "Commutative property: a + b = b + a (order doesn't matter)",
      "Associative property: (a+b)+c = a+(b+c)",
      "Adding 0 to any number gives the same number (Identity property)",
      "The result of addition is called the sum",
    ],
    examples: [
      "Simple: 5 + 3 = 8",
      "With carrying: 47 + 56 = 103 (7+6=13, write 3 carry 1; 4+5+1=10)",
      "Decimals: 3.5 + 2.8 = 6.3",
    ],
    resources: [
      {
        label: "Khan Academy – Addition",
        url: "https://www.khanacademy.org/math/cc-2nd-grade-math/cc-2nd-add-subtract",
      },
      {
        label: "Math is Fun – Addition",
        url: "https://www.mathsisfun.com/numbers/addition.html",
      },
    ],
  },
  {
    id: "math-subtraction",
    title: "Subtraction",
    category: "Math",
    definition:
      "Subtraction is the arithmetic operation of finding the difference between two numbers. It is the inverse of addition and answers 'how many are left?' or 'how many more/fewer?'",
    steps: [
      "Write the larger number on top and the smaller number below, aligning place values.",
      "Start from the ones column and subtract the bottom digit from the top digit.",
      "If the top digit is smaller, borrow 10 from the next left column and add it.",
      "Reduce the next left column's digit by 1 after borrowing.",
      "Continue leftward until all columns are processed.",
    ],
    keyPoints: [
      "Subtraction is NOT commutative: a − b ≠ b − a",
      "Subtracting 0 from any number gives the same number",
      "Result is called the difference",
      "Minuend − Subtrahend = Difference",
    ],
    examples: [
      "Basic: 9 − 4 = 5",
      "With borrowing: 83 − 47 = 36",
      "Checking: 36 + 47 = 83 ✓ (use addition to verify)",
    ],
    resources: [
      {
        label: "Khan Academy – Subtraction",
        url: "https://www.khanacademy.org/math/cc-2nd-grade-math/cc-2nd-add-subtract",
      },
      {
        label: "Math is Fun – Subtraction",
        url: "https://www.mathsisfun.com/numbers/subtraction.html",
      },
    ],
  },
  {
    id: "math-multiplication",
    title: "Multiplication",
    category: "Math",
    definition:
      "Multiplication is repeated addition. It is the process of adding a number to itself a specified number of times. The result is called the product.",
    steps: [
      "Write the multiplicand (first number) and multiplier (second number).",
      "Multiply each digit of the bottom number with every digit of the top number.",
      "Write partial products, shifting one place to the left for each row.",
      "Add all partial products together to get the final product.",
    ],
    keyPoints: [
      "Commutative: a × b = b × a",
      "Associative: (a×b)×c = a×(b×c)",
      "Distributive: a×(b+c) = a×b + a×c",
      "Multiplying any number by 0 gives 0; by 1 gives the same number",
    ],
    examples: [
      "6 × 7 = 42",
      "23 × 4 = 92 (4×3=12 write 2 carry 1; 4×2+1=9)",
      "Real-world: 5 bags × 12 apples each = 60 apples total",
    ],
    resources: [
      {
        label: "Khan Academy – Multiplication",
        url: "https://www.khanacademy.org/math/arithmetic/arith-review-multiply-divide",
      },
      {
        label: "Multiplication Table",
        url: "https://www.mathsisfun.com/tables.html",
      },
    ],
  },
  {
    id: "math-division",
    title: "Division",
    category: "Math",
    definition:
      "Division is the process of splitting a number into equal parts or groups. It is the inverse of multiplication. The number being divided is the dividend, what you divide by is the divisor, and the result is the quotient.",
    steps: [
      "Set up the long division: dividend inside, divisor outside.",
      "Find how many times the divisor fits into the first digit(s) of the dividend.",
      "Write that number (quotient digit) above.",
      "Multiply the quotient digit by the divisor and subtract.",
      "Bring down the next digit and repeat until no digits remain.",
    ],
    keyPoints: [
      "Division by zero is undefined",
      "Any number divided by 1 equals itself",
      "Dividend ÷ Divisor = Quotient (with possible Remainder)",
      "Division is NOT commutative: a ÷ b ≠ b ÷ a",
    ],
    examples: [
      "Simple: 20 ÷ 4 = 5",
      "With remainder: 17 ÷ 5 = 3 remainder 2",
      "Real-world: 30 students in 5 groups = 6 students per group",
    ],
    resources: [
      {
        label: "Khan Academy – Division",
        url: "https://www.khanacademy.org/math/arithmetic/arith-review-multiply-divide",
      },
      {
        label: "Math is Fun – Division",
        url: "https://www.mathsisfun.com/numbers/division.html",
      },
    ],
  },
  {
    id: "math-bodmas",
    title: "BODMAS / Order of Operations",
    category: "Math",
    definition:
      "BODMAS is a rule that defines the sequence in which multiple operations in an expression should be performed: Brackets, Orders (powers/roots), Division, Multiplication, Addition, Subtraction. In the US it is called PEMDAS.",
    steps: [
      "Step 1 — Brackets: Solve all expressions inside brackets first ( ), then [ ], then { }.",
      "Step 2 — Orders: Evaluate exponents and square roots.",
      "Step 3 — Division & Multiplication: Work left-to-right, whichever comes first.",
      "Step 4 — Addition & Subtraction: Work left-to-right, whichever comes first.",
    ],
    keyPoints: [
      "Never skip steps — the order is strict",
      "Division and Multiplication have equal precedence; evaluate left-to-right",
      "Addition and Subtraction have equal precedence; evaluate left-to-right",
      "Nested brackets: solve innermost first",
    ],
    examples: [
      "2 + 3 × 4 = 2 + 12 = 14 (NOT 20)",
      "(2 + 3) × 4 = 5 × 4 = 20",
      "10 + 2² ÷ 2 = 10 + 4 ÷ 2 = 10 + 2 = 12",
    ],
    resources: [
      {
        label: "Khan Academy – Order of Operations",
        url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-arith-prop/pre-algebra-order-of-operations/a/order-of-operations-review",
      },
      {
        label: "Math is Fun – BODMAS",
        url: "https://www.mathsisfun.com/operation-order-bodmas.html",
      },
    ],
  },
  {
    id: "math-algebra",
    title: "Algebra & Equations",
    category: "Math",
    definition:
      "Algebra is the branch of mathematics that uses letters (variables) to represent unknown values in equations and formulas. An equation is a mathematical statement that two expressions are equal.",
    steps: [
      "Identify the variable (unknown) in the equation, e.g., x.",
      "Perform the same operation on both sides to keep balance.",
      "Isolate the variable: move constants to one side using inverse operations.",
      "Simplify until the variable is alone on one side.",
      "Check your answer by substituting back into the original equation.",
    ],
    keyPoints: [
      "Whatever you do to one side, do to the other side",
      "Addition and subtraction are inverse operations",
      "Multiplication and division are inverse operations",
      "A solution makes the equation true",
    ],
    examples: [
      "Solve: x + 5 = 12 → x = 12 − 5 → x = 7",
      "Solve: 3x = 18 → x = 18 ÷ 3 → x = 6",
      "Solve: 2x + 3 = 11 → 2x = 8 → x = 4",
    ],
    resources: [
      {
        label: "Khan Academy – Algebra Basics",
        url: "https://www.khanacademy.org/math/algebra-basics",
      },
      {
        label: "Math is Fun – Algebra",
        url: "https://www.mathsisfun.com/algebra/index.html",
      },
    ],
  },
  {
    id: "math-fractions",
    title: "Fractions",
    category: "Math",
    definition:
      "A fraction represents a part of a whole. It has a numerator (top number — how many parts) and a denominator (bottom number — total equal parts). Fractions can be proper (< 1), improper (≥ 1), or mixed numbers.",
    steps: [
      "To add/subtract fractions: find the Least Common Denominator (LCD), convert, then operate on numerators.",
      "To multiply fractions: multiply numerators together and denominators together, then simplify.",
      "To divide fractions: multiply the first fraction by the reciprocal of the second.",
      "To simplify: find the GCD of numerator and denominator and divide both by it.",
    ],
    keyPoints: [
      "Equivalent fractions have the same value: 1/2 = 2/4 = 3/6",
      "To compare fractions, convert to common denominators",
      "A fraction with 0 in the denominator is undefined",
      "Mixed number = whole number + proper fraction",
    ],
    examples: [
      "1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2",
      "3/4 × 2/5 = 6/20 = 3/10",
      "1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2",
    ],
    resources: [
      {
        label: "Khan Academy – Fractions",
        url: "https://www.khanacademy.org/math/arithmetic/fraction-arithmetic",
      },
      {
        label: "Math is Fun – Fractions",
        url: "https://www.mathsisfun.com/fractions.html",
      },
    ],
  },
  {
    id: "math-ratios",
    title: "Ratios & Proportions",
    category: "Math",
    definition:
      "A ratio compares two quantities of the same kind. A proportion is an equation stating that two ratios are equal. They are used in scaling, recipes, maps, and many real-life applications.",
    steps: [
      "Write the ratio as a fraction: a : b = a/b.",
      "Simplify by dividing both terms by their GCD.",
      "For proportions, set up: a/b = c/d and cross-multiply to solve for the unknown.",
      "Check by verifying both ratios reduce to the same fraction.",
    ],
    keyPoints: [
      "Ratios can be written as a:b, a to b, or a/b",
      "Cross-multiplication: if a/b = c/d then ad = bc",
      "Unitary method: find the value of one unit, then scale",
      "Percentages are ratios out of 100",
    ],
    examples: [
      "Ratio 3:4 means for every 3 of A there are 4 of B",
      "Proportion: 2/3 = x/9 → x = 6",
      "Recipe: if 2 cups flour makes 12 cookies, 5 cups makes 30 cookies",
    ],
    resources: [
      {
        label: "Khan Academy – Ratios",
        url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates",
      },
      {
        label: "Math is Fun – Ratio",
        url: "https://www.mathsisfun.com/numbers/ratio.html",
      },
    ],
  },
  {
    id: "math-exponents",
    title: "Square Roots & Exponents",
    category: "Math",
    definition:
      "An exponent (or power) tells you how many times to multiply a base number by itself. A square root is the inverse operation: finding a number which, when multiplied by itself, gives the original.",
    steps: [
      "Exponent: b^n means multiply b by itself n times. E.g., 2^4 = 2×2×2×2 = 16.",
      "Square root: √x finds a number y such that y² = x.",
      "For non-perfect squares, use a calculator or estimate between two perfect squares.",
      "Apply exponent laws to simplify expressions.",
    ],
    keyPoints: [
      "Any number to the power 0 equals 1: n⁰ = 1",
      "Negative exponent: a⁻ⁿ = 1/aⁿ",
      "Product rule: a^m × a^n = a^(m+n)",
      "Perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100",
    ],
    examples: [
      "3² = 9, 2⁵ = 32, 10³ = 1000",
      "√64 = 8 (since 8² = 64)",
      "√2 ≈ 1.414 (irrational number)",
    ],
    resources: [
      {
        label: "Khan Academy – Exponents",
        url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-exponents-radicals",
      },
      {
        label: "Math is Fun – Square Roots",
        url: "https://www.mathsisfun.com/square-root.html",
      },
    ],
  },
  {
    id: "math-geometry",
    title: "Geometry Basics",
    category: "Math",
    definition:
      "Geometry is the branch of mathematics that studies shapes, sizes, angles, and the properties of figures in 2D and 3D space. Key concepts include points, lines, angles, polygons, and circles.",
    steps: [
      "Learn basic elements: point (location), line (infinite), line segment (finite), ray (one endpoint).",
      "Understand angles: acute (<90°), right (90°), obtuse (90–180°), straight (180°), reflex (>180°).",
      "Study 2D shapes: triangles, quadrilaterals, circles, and their properties.",
      "Learn area and perimeter formulas for each shape.",
      "Explore 3D shapes: cube, cuboid, cylinder, sphere, cone.",
    ],
    keyPoints: [
      "Perimeter = total length around a shape",
      "Area = amount of surface a shape covers",
      "Sum of angles in a triangle = 180°",
      "Circumference of circle = 2πr; Area = πr²",
    ],
    examples: [
      "Rectangle area: 6 × 4 = 24 sq units",
      "Triangle area: ½ × base × height = ½ × 5 × 3 = 7.5 sq units",
      "Circle circumference: 2 × π × 7 ≈ 43.98",
    ],
    resources: [
      {
        label: "Khan Academy – Geometry",
        url: "https://www.khanacademy.org/math/geometry",
      },
      {
        label: "Math is Fun – Geometry",
        url: "https://www.mathsisfun.com/geometry/index.html",
      },
    ],
  },
  // ---- COMPUTER SCIENCE ---------------------------------------------------
  {
    id: "cs-variables",
    title: "Variables & Data Types",
    category: "Computer Science",
    definition:
      "A variable is a named container that stores data in a program. Every variable has a data type that defines what kind of data it can hold. Common types include integers, floats, strings, and booleans.",
    steps: [
      "Declare the variable with a name that describes its purpose.",
      "Assign a data type (in statically-typed languages) or let it be inferred.",
      "Assign a value using the assignment operator (=).",
      "Use the variable name to read or update its value throughout your code.",
    ],
    keyPoints: [
      "int: whole numbers; float/double: decimal numbers; string: text; bool: true/false",
      "Variable names cannot start with a digit or use reserved keywords",
      "Statically-typed (Java, C) vs dynamically-typed (Python, JS)",
      "Constants (const/final) cannot be changed after assignment",
    ],
    examples: [
      "Python: age = 17  |  name = 'Alice'  |  is_student = True",
      'Java: int score = 95;  String subject = "Math";',
      "C: float temperature = 36.6f;",
    ],
    resources: [
      {
        label: "W3Schools – Python Variables",
        url: "https://www.w3schools.com/python/python_variables.asp",
      },
      {
        label: "MDN – JavaScript Variables",
        url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables",
      },
    ],
  },
  {
    id: "cs-loops",
    title: "Loops",
    category: "Computer Science",
    definition:
      "A loop is a control structure that repeats a block of code multiple times until a condition is false (or true). Loops are fundamental for processing collections, repeating tasks, and building algorithms.",
    steps: [
      "Choose the right loop: for (known iterations), while (condition-based), do-while (run at least once).",
      "Set up the initializer (starting value), condition (when to stop), and update (increment/decrement).",
      "Write the loop body — the code that executes each iteration.",
      "Ensure the loop condition eventually becomes false to avoid infinite loops.",
    ],
    keyPoints: [
      "for loop: best when the number of iterations is known",
      "while loop: best when you loop until a condition changes",
      "break exits the loop early; continue skips the current iteration",
      "Infinite loops crash programs — always verify the exit condition",
    ],
    examples: [
      "Python for: for i in range(5): print(i)  → prints 0,1,2,3,4",
      "Java while: while(x < 10) { x++; }",
      'C for: for(int i=0; i<3; i++) { printf("%d\\n", i); }',
    ],
    resources: [
      {
        label: "W3Schools – Python Loops",
        url: "https://www.w3schools.com/python/python_for_loops.asp",
      },
      {
        label: "Khan Academy – Loops",
        url: "https://www.khanacademy.org/computing/computer-programming/programming/looping/pt/for-loops",
      },
    ],
  },
  {
    id: "cs-functions",
    title: "Functions",
    category: "Computer Science",
    definition:
      "A function is a named, reusable block of code that performs a specific task. Functions take inputs (parameters), execute code, and optionally return an output. They promote code reuse and readability.",
    steps: [
      "Define the function with a name, parameter list, and return type (if applicable).",
      "Write the function body — the logic to execute.",
      "Return a value using the return statement (if needed).",
      "Call the function by its name with appropriate arguments wherever needed.",
    ],
    keyPoints: [
      "DRY principle: Don't Repeat Yourself — use functions for repeated logic",
      "Parameters are variables inside the function; arguments are values passed in",
      "A function can return one value (or none — void/None)",
      "Functions can call other functions (composition)",
    ],
    examples: [
      "Python: def greet(name): return 'Hello, ' + name",
      "Java: int square(int n) { return n * n; }",
      "JS: const add = (a, b) => a + b;",
    ],
    resources: [
      {
        label: "W3Schools – Python Functions",
        url: "https://www.w3schools.com/python/python_functions.asp",
      },
      {
        label: "MDN – JavaScript Functions",
        url: "https://developer.mozilla.org/en-US/docs/Guide/Functions",
      },
    ],
  },
  {
    id: "cs-arrays",
    title: "Arrays",
    category: "Computer Science",
    definition:
      "An array is a data structure that stores a fixed-size sequence of elements of the same type in contiguous memory locations. Each element is accessed by its index (starting at 0).",
    steps: [
      "Declare the array with a type and size (in C/Java) or just a list (Python).",
      "Initialize elements by index or with an initializer list.",
      "Access elements using arr[index] — remember index starts at 0.",
      "Iterate over elements using a loop.",
      "Perform operations: insert, delete, search, sort.",
    ],
    keyPoints: [
      "Zero-indexed: first element is arr[0]",
      "Fixed size in C/Java; dynamic in Python (list) and JS",
      "Arrays enable efficient random access in O(1) time",
      "2D arrays (matrices): arr[row][col]",
    ],
    examples: [
      'C: int arr[3] = {10, 20, 30};  printf("%d", arr[1]); // 20',
      "Python: nums = [1, 2, 3, 4];  print(nums[2])  # 3",
      "Java: int[] marks = {85, 92, 78};",
    ],
    resources: [
      {
        label: "W3Schools – Arrays",
        url: "https://www.w3schools.com/java/java_arrays.asp",
      },
      {
        label: "GeeksForGeeks – Arrays",
        url: "https://www.geeksforgeeks.org/array-data-structure/",
      },
    ],
  },
  {
    id: "cs-oop",
    title: "Object-Oriented Programming (OOP)",
    category: "Computer Science",
    definition:
      "OOP is a programming paradigm that models real-world entities as objects combining data (attributes) and behavior (methods). The four pillars of OOP are Encapsulation, Inheritance, Polymorphism, and Abstraction.",
    steps: [
      "Define a class as a blueprint: attributes (fields) and methods (functions).",
      "Create objects (instances) of the class using the constructor.",
      "Use Encapsulation: hide internal data with private fields and public getters/setters.",
      "Use Inheritance: a child class extends a parent class, inheriting its properties.",
      "Use Polymorphism: override methods in subclasses for different behaviors.",
    ],
    keyPoints: [
      "Class = blueprint; Object = instance of a class",
      "Encapsulation: data hiding for security",
      "Inheritance: 'is-a' relationship, promotes code reuse",
      "Polymorphism: one interface, many forms",
    ],
    examples: [
      "Java: class Animal { String name; void speak() {} }",
      'class Dog extends Animal { void speak() { System.out.println("Woof"); } }',
      "Python: class Circle: def __init__(self, r): self.radius = r",
    ],
    resources: [
      {
        label: "GeeksForGeeks – OOP",
        url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
      },
      {
        label: "W3Schools – Python OOP",
        url: "https://www.w3schools.com/python/python_classes.asp",
      },
    ],
  },
  {
    id: "cs-recursion",
    title: "Recursion",
    category: "Computer Science",
    definition:
      "Recursion is a technique where a function calls itself to solve a smaller instance of the same problem. Every recursive function needs a base case (to stop) and a recursive case (to continue).",
    steps: [
      "Identify the problem that can be broken into smaller identical sub-problems.",
      "Define the base case: the simplest scenario where the function returns without calling itself.",
      "Define the recursive case: call the function with a smaller input.",
      "Trust that the recursive call works correctly (induction hypothesis).",
      "Trace through the call stack to verify correctness.",
    ],
    keyPoints: [
      "Always have a base case or risk a stack overflow",
      "Each call creates a new stack frame",
      "Recursion can replace loops for tree/graph traversal",
      "Tail recursion can be optimized by compilers",
    ],
    examples: [
      "Factorial: f(n) = n × f(n-1); base: f(0) = 1",
      "f(4) = 4×f(3) = 4×3×f(2) = 4×3×2×1 = 24",
      "Fibonacci: fib(n) = fib(n-1) + fib(n-2); base: fib(0)=0, fib(1)=1",
    ],
    resources: [
      {
        label: "Khan Academy – Recursion",
        url: "https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/recursion",
      },
      {
        label: "GeeksForGeeks – Recursion",
        url: "https://www.geeksforgeeks.org/recursion/",
      },
    ],
  },
  {
    id: "cs-sorting",
    title: "Sorting Algorithms",
    category: "Computer Science",
    definition:
      "Sorting algorithms arrange elements of a list in a specific order (ascending or descending). They are fundamental to computer science, affecting performance of search, data analysis, and databases.",
    steps: [
      "Bubble Sort: repeatedly swap adjacent elements if they are in the wrong order — O(n²).",
      "Selection Sort: find the minimum element and place it at the front — O(n²).",
      "Insertion Sort: build sorted array one element at a time — O(n²) but good for small/nearly-sorted data.",
      "Merge Sort: divide-and-conquer, recursively split and merge — O(n log n).",
      "Quick Sort: pick a pivot, partition, recurse — O(n log n) average.",
    ],
    keyPoints: [
      "Time complexity matters for large datasets",
      "Stable sort: preserves relative order of equal elements",
      "In-place sort: uses no extra memory",
      "Best general-purpose: Merge Sort / Quick Sort",
    ],
    examples: [
      "Bubble Sort on [5,3,1,4,2]: pass 1 → [3,1,4,2,5], pass 2 → [1,3,2,4,5]...",
      "Python built-in: sorted([5,2,8,1]) → [1, 2, 5, 8]",
      "Quick Sort pivot: [3,1,4,1,5,9,2] pivot=4 → [3,1,1,2] 4 [5,9]",
    ],
    resources: [
      { label: "Visualgo – Sorting", url: "https://visualgo.net/en/sorting" },
      {
        label: "GeeksForGeeks – Sorting",
        url: "https://www.geeksforgeeks.org/sorting-algorithms/",
      },
    ],
  },
  {
    id: "cs-binary",
    title: "Binary Numbers",
    category: "Computer Science",
    definition:
      "Binary is a base-2 number system that uses only 0s and 1s. Computers use binary because electronic circuits have two states: ON (1) and OFF (0). All data — text, images, instructions — is stored as binary.",
    steps: [
      "Decimal to Binary: divide the number by 2 repeatedly; write remainders bottom-to-top.",
      "Binary to Decimal: multiply each bit by its positional value (2^n) and sum.",
      "Binary addition: 0+0=0, 0+1=1, 1+1=10 (0 carry 1), 1+1+1=11.",
      "Use 8-bit groups (bytes) to represent values 0–255.",
    ],
    keyPoints: [
      "1 bit = 0 or 1; 8 bits = 1 byte",
      "Binary counting: 0,1,10,11,100,101,110,111,1000...",
      "Hexadecimal (base-16) is a shorthand for binary",
      "ASCII encodes characters as numbers (A=65=01000001 in binary)",
    ],
    examples: [
      "Decimal 13 = 1101 in binary (8+4+0+1)",
      "Binary 1010 = 10 in decimal (8+0+2+0)",
      "Binary addition: 0110 + 0011 = 1001 (6+3=9)",
    ],
    resources: [
      {
        label: "Khan Academy – Binary Numbers",
        url: "https://www.khanacademy.org/computing/ap-computer-science-principles/x2d2f703b37b450a3:digital-information/x2d2f703b37b450a3:binary-numbers/a/bits-and-binary",
      },
      {
        label: "Binary Converter",
        url: "https://www.rapidtables.com/convert/number/binary-to-decimal.html",
      },
    ],
  },
  {
    id: "cs-html",
    title: "HTML Basics",
    category: "Computer Science",
    definition:
      "HTML (HyperText Markup Language) is the standard language for creating web pages. It uses elements represented by tags to structure content: headings, paragraphs, links, images, forms, and more.",
    steps: [
      "Every HTML file starts with <!DOCTYPE html> followed by <html>, <head>, and <body> tags.",
      "Place metadata (title, styles, scripts) inside <head>.",
      "Place visible content inside <body>.",
      "Use semantic tags like <header>, <main>, <article>, <footer> for structure.",
      "Nest elements correctly — always close tags in the reverse order they were opened.",
    ],
    keyPoints: [
      "Tags: <tagname>content</tagname>; self-closing: <img />, <br />",
      "Attributes provide additional info: <a href='url'>Link</a>",
      "id is unique per page; class can be reused on multiple elements",
      "HTML is not case-sensitive but lowercase is the convention",
    ],
    examples: [
      "<h1>Hello World</h1>",
      "<p>This is a <strong>paragraph</strong> with <em>emphasis</em>.</p>",
      "<a href='https://example.com' target='_blank'>Visit Site</a>",
    ],
    resources: [
      {
        label: "MDN – HTML Basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML",
      },
      { label: "W3Schools – HTML", url: "https://www.w3schools.com/html/" },
    ],
  },
  {
    id: "cs-css",
    title: "CSS Basics",
    category: "Computer Science",
    definition:
      "CSS (Cascading Style Sheets) is the language used to style and visually design HTML web pages. It controls colors, fonts, layouts, spacing, animations, and responsiveness.",
    steps: [
      "Select an element using a CSS selector (tag, class, id, etc.).",
      "Write a declaration block: { property: value; }",
      "Link your CSS file to HTML using <link rel='stylesheet' href='style.css' />.",
      "Use the box model: content, padding, border, margin.",
      "Use Flexbox or Grid for layouts.",
    ],
    keyPoints: [
      "Specificity determines which rule applies when multiple rules target the same element",
      "Cascade: later rules override earlier ones (with equal specificity)",
      "Responsive design: use media queries @media (max-width: 768px)",
      "Classes (.name) are more reusable than IDs (#name)",
    ],
    examples: [
      "p { color: blue; font-size: 16px; }",
      ".card { background: white; border-radius: 8px; padding: 16px; }",
      "@media (max-width: 600px) { .nav { flex-direction: column; } }",
    ],
    resources: [
      {
        label: "MDN – CSS Basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps",
      },
      { label: "W3Schools – CSS", url: "https://www.w3schools.com/css/" },
    ],
  },
  {
    id: "cs-javascript",
    title: "JavaScript Basics",
    category: "Computer Science",
    definition:
      "JavaScript is the programming language of the web. It runs in browsers (and on servers via Node.js) and enables dynamic, interactive web pages. It is event-driven, prototype-based, and supports functional programming.",
    steps: [
      "Include JS in HTML using <script src='app.js'></script> or inline <script> tags.",
      "Declare variables with let (mutable), const (immutable), or var (legacy).",
      "Use functions, conditionals (if/else, switch), and loops (for, while).",
      "Manipulate the DOM: document.getElementById(), querySelector(), innerHTML.",
      "Handle events: element.addEventListener('click', callback).",
    ],
    keyPoints: [
      "JavaScript is single-threaded but handles async via callbacks, Promises, async/await",
      "typeof operator checks type at runtime",
      "=== (strict equality) vs == (type-coercing equality)",
      "Arrays and objects are reference types",
    ],
    examples: [
      "let x = 10; const PI = 3.14; let name = 'Alice';",
      "document.getElementById('btn').addEventListener('click', () => alert('Clicked!'));",
      "fetch('/api/data').then(res => res.json()).then(data => console.log(data));",
    ],
    resources: [
      {
        label: "MDN – JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript",
      },
      { label: "JavaScript.info", url: "https://javascript.info" },
    ],
  },
  {
    id: "cs-python",
    title: "Python Basics",
    category: "Computer Science",
    definition:
      "Python is a high-level, interpreted, dynamically-typed programming language known for its simple, readable syntax. It is widely used in data science, AI, web development, automation, and education.",
    steps: [
      "Install Python from python.org and run scripts with: python filename.py",
      "Learn basic syntax: indentation defines code blocks (no braces).",
      "Use print() for output, input() for user input.",
      "Learn data types: int, float, str, list, tuple, dict, set, bool.",
      "Write functions with def and classes with class.",
    ],
    keyPoints: [
      "Indentation is syntax — inconsistent indentation causes errors",
      "Python uses 0-based indexing for lists",
      "List comprehensions: [x*2 for x in range(5)] = [0,2,4,6,8]",
      "pip is Python's package manager",
    ],
    examples: [
      "for i in range(1, 6): print(i)  # prints 1 to 5",
      "def factorial(n): return 1 if n==0 else n*factorial(n-1)",
      "grades = {'Alice': 95, 'Bob': 87}; print(grades['Alice'])",
    ],
    resources: [
      {
        label: "Python Official Docs",
        url: "https://docs.python.org/3/tutorial/",
      },
      { label: "W3Schools – Python", url: "https://www.w3schools.com/python/" },
    ],
  },
  {
    id: "cs-c",
    title: "C Basics",
    category: "Computer Science",
    definition:
      "C is a general-purpose, procedural programming language developed in 1972. It is close to hardware, extremely fast, and forms the foundation of operating systems (Linux, Windows) and many other languages.",
    steps: [
      "Start with #include <stdio.h> and a main() function.",
      "Declare variables with explicit types: int, float, char, double.",
      "Use printf() for output and scanf() for input.",
      "Understand pointers: a variable that stores the memory address of another variable.",
      "Manage memory manually: malloc() to allocate, free() to deallocate.",
    ],
    keyPoints: [
      "C is compiled; you must compile before running: gcc file.c -o output",
      "Pointers are powerful but risky — null/dangling pointers cause crashes",
      "Arrays in C are essentially pointers to their first element",
      "No classes — use structs for grouping data",
    ],
    examples: [
      '#include <stdio.h>\\nint main() { printf("Hello World"); return 0; }',
      'int arr[3] = {1, 2, 3};  printf("%d", arr[0]);  // 1',
      'int *p = &x;  printf("%d", *p);  // prints value at address',
    ],
    resources: [
      {
        label: "GeeksForGeeks – C Programming",
        url: "https://www.geeksforgeeks.org/c-programming-language/",
      },
      { label: "Learn-C.org", url: "https://www.learn-c.org/" },
    ],
  },
  {
    id: "cs-java",
    title: "Java Basics",
    category: "Computer Science",
    definition:
      "Java is a class-based, object-oriented programming language designed for platform independence — 'Write Once, Run Anywhere' via the Java Virtual Machine (JVM). It is widely used in enterprise, Android, and large-scale systems.",
    steps: [
      "Every Java program starts with a class matching the filename and a main method: public static void main(String[] args).",
      "Compile with: javac FileName.java; run with: java FileName.",
      "Understand primitive types: int, double, boolean, char.",
      "Create classes with fields and methods; instantiate objects with new.",
      "Handle exceptions with try-catch-finally blocks.",
    ],
    keyPoints: [
      "Java is strongly typed — type must be declared",
      "JVM makes Java platform-independent",
      "Everything in Java is inside a class",
      "Garbage collection handles memory automatically",
    ],
    examples: [
      'System.out.println("Hello World");',
      "int[] nums = {1, 2, 3}; for(int n : nums) System.out.println(n);",
      "Scanner sc = new Scanner(System.in); int n = sc.nextInt();",
    ],
    resources: [
      { label: "W3Schools – Java", url: "https://www.w3schools.com/java/" },
      {
        label: "Oracle Java Docs",
        url: "https://docs.oracle.com/en/java/javase/17/docs/api/index.html",
      },
    ],
  },
  {
    id: "cs-dbms",
    title: "DBMS & SQL",
    category: "Computer Science",
    definition:
      "A Database Management System (DBMS) is software that stores, organizes, and manages data. SQL (Structured Query Language) is the standard language for interacting with relational databases (RDBMS like MySQL, PostgreSQL).",
    steps: [
      "Understand tables: rows (records) and columns (fields).",
      "CREATE TABLE to define a schema; INSERT INTO to add data.",
      "SELECT * FROM table to query data; use WHERE to filter.",
      "JOIN combines data from multiple tables using a common key.",
      "Apply ACID properties: Atomicity, Consistency, Isolation, Durability.",
    ],
    keyPoints: [
      "Primary Key: uniquely identifies each row",
      "Foreign Key: links two tables",
      "Normalization: reduce data redundancy (1NF, 2NF, 3NF)",
      "Indexes speed up queries but slow down writes",
    ],
    examples: [
      "SELECT name, grade FROM students WHERE grade > 80;",
      "SELECT s.name, c.title FROM students s JOIN courses c ON s.course_id = c.id;",
      "UPDATE students SET grade = 95 WHERE id = 3;",
    ],
    resources: [
      { label: "W3Schools – SQL", url: "https://www.w3schools.com/sql/" },
      { label: "SQLZoo – Interactive SQL", url: "https://sqlzoo.net/" },
    ],
  },
  {
    id: "cs-os",
    title: "Operating Systems",
    category: "Computer Science",
    definition:
      "An Operating System (OS) is system software that manages computer hardware and software resources and provides services for programs. Examples: Windows, Linux, macOS, Android.",
    steps: [
      "Understand the kernel: core component managing CPU, memory, devices.",
      "Learn process management: creation, scheduling (FCFS, Round Robin), termination.",
      "Study memory management: paging, segmentation, virtual memory.",
      "Understand file systems: how data is stored and accessed on disk.",
      "Learn deadlocks: conditions (mutual exclusion, hold-and-wait, no-preemption, circular wait) and prevention.",
    ],
    keyPoints: [
      "Process vs Thread: processes are independent; threads share memory",
      "Context switching: OS saves and restores process state",
      "Virtual memory allows programs larger than physical RAM",
      "OS provides system calls as the interface between programs and hardware",
    ],
    examples: [
      "Process scheduling: 3 processes with burst times 5,3,8 — FCFS order: P1 done at 5, P2 at 8, P3 at 16",
      "Deadlock example: P1 holds R1 and needs R2; P2 holds R2 and needs R1",
      "Page fault: CPU accesses a page not in RAM, OS loads it from disk",
    ],
    resources: [
      {
        label: "GeeksForGeeks – OS",
        url: "https://www.geeksforgeeks.org/operating-systems/",
      },
      {
        label: "OS Textbook (free)",
        url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      },
    ],
  },
  {
    id: "cs-data-structures",
    title: "Data Structures",
    category: "Computer Science",
    definition:
      "Data structures are ways of organizing and storing data in a computer so that it can be accessed and modified efficiently. Key structures include arrays, linked lists, stacks, queues, trees, and graphs.",
    steps: [
      "Stack (LIFO): push() adds to top, pop() removes from top — used in function calls, undo operations.",
      "Queue (FIFO): enqueue() adds to rear, dequeue() removes from front — used in BFS, scheduling.",
      "Linked List: nodes with data + pointer to next — dynamic size, O(n) access.",
      "Tree: hierarchical structure with root, branches, leaves — BST enables O(log n) search.",
      "Graph: nodes connected by edges — used in maps, social networks (BFS, DFS traversal).",
    ],
    keyPoints: [
      "Choose structure based on operations needed: frequent search → hash map; frequent insertions at front → linked list",
      "Big-O notation measures time and space complexity",
      "Hash Map provides O(1) average lookup",
      "Binary Search Tree: left child < node < right child",
    ],
    examples: [
      "Stack: browser back-button history, call stack in recursion",
      "Queue: print spooler, ticket booking system",
      "BST search for 7 in [5,3,8,1,4,7,9]: right→right→left → found",
    ],
    resources: [
      { label: "Visualgo – Data Structures", url: "https://visualgo.net/en" },
      {
        label: "GeeksForGeeks – DS",
        url: "https://www.geeksforgeeks.org/data-structures/",
      },
    ],
  },
  {
    id: "cs-networks",
    title: "Computer Networks",
    category: "Computer Science",
    definition:
      "A computer network is a collection of interconnected devices that share resources and communicate. The Internet is the world's largest network. Key concepts include protocols, IP addressing, and the OSI model.",
    steps: [
      "Learn the OSI model: 7 layers — Physical, Data Link, Network, Transport, Session, Presentation, Application.",
      "Understand IP addresses: IPv4 (e.g., 192.168.1.1) and IPv6.",
      "TCP vs UDP: TCP is reliable (connection-oriented); UDP is fast but unreliable.",
      "DNS: translates domain names to IP addresses.",
      "HTTP/HTTPS: protocols for web communication; HTTPS adds TLS encryption.",
    ],
    keyPoints: [
      "Router: forwards packets between networks; Switch: connects devices within a network",
      "Port numbers identify services: HTTP=80, HTTPS=443, SSH=22",
      "Subnet mask defines the network boundary",
      "Packet switching: data is broken into packets and reassembled",
    ],
    examples: [
      "When you type google.com: DNS lookup → IP found → TCP handshake → HTTP GET → page loads",
      "Ping 8.8.8.8 to check connectivity to Google's DNS server",
      "IPv4: 4 bytes (32 bits); IPv6: 16 bytes (128 bits)",
    ],
    resources: [
      {
        label: "Cisco Networking Basics",
        url: "https://www.netacad.com/courses/intro-cybersecurity",
      },
      {
        label: "GeeksForGeeks – Networks",
        url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
      },
    ],
  },
  // ---- SCIENCE ------------------------------------------------------------
  {
    id: "sci-photosynthesis",
    title: "Photosynthesis",
    category: "Science",
    definition:
      "Photosynthesis is the process by which green plants, algae, and some bacteria convert sunlight, water, and carbon dioxide into glucose (food) and oxygen. It occurs mainly in the chloroplasts of plant cells.",
    steps: [
      "Light-dependent reactions (in thylakoid membranes): absorb sunlight, split water (H₂O), release O₂, produce ATP and NADPH.",
      "Light-independent reactions / Calvin Cycle (in stroma): use ATP + NADPH to fix CO₂ into glucose (C₆H₁₂O₆).",
      "Overall equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
    ],
    keyPoints: [
      "Chlorophyll in chloroplasts absorbs red and blue light (reflects green — why plants look green)",
      "Glucose is used for energy (respiration) or building materials (cellulose, starch)",
      "Factors affecting rate: light intensity, CO₂ concentration, temperature",
      "Photorespiration reduces efficiency in hot, dry conditions",
    ],
    examples: [
      "A leaf in sunlight absorbs CO₂ through stomata and releases O₂",
      "Aquatic plants like Elodea visibly produce O₂ bubbles in bright light",
      "Autumn: reduced light causes chlorophyll breakdown, revealing yellow/red pigments",
    ],
    resources: [
      {
        label: "Khan Academy – Photosynthesis",
        url: "https://www.khanacademy.org/science/ap-biology/cellular-energetics/photosynthesis/a/intro-to-photosynthesis",
      },
      {
        label: "Biology Online – Photosynthesis",
        url: "https://www.biologyonline.com/dictionary/photosynthesis",
      },
    ],
  },
  {
    id: "sci-newton",
    title: "Newton's Laws of Motion",
    category: "Science",
    definition:
      "Newton's three laws of motion describe the relationship between a body and the forces acting on it, forming the foundation of classical mechanics. They were formulated by Isaac Newton in 1687.",
    steps: [
      "First Law (Inertia): An object at rest stays at rest; an object in motion stays in motion unless acted on by an external force.",
      "Second Law (F=ma): The acceleration of an object is directly proportional to the net force and inversely proportional to its mass: F = ma.",
      "Third Law (Action-Reaction): For every action, there is an equal and opposite reaction.",
    ],
    keyPoints: [
      "Inertia is the tendency of objects to resist changes in motion",
      "F = ma: force in Newtons (N), mass in kg, acceleration in m/s²",
      "Action-reaction pairs act on DIFFERENT objects, not the same one",
      "Net force = vector sum of all forces",
    ],
    examples: [
      "1st Law: A book on a table stays still — friction + normal force balance gravity",
      "2nd Law: 10 N force on 2 kg object → acceleration = 5 m/s²",
      "3rd Law: Rocket exhaust pushes down → rocket pushes up",
    ],
    resources: [
      {
        label: "Khan Academy – Newton's Laws",
        url: "https://www.khanacademy.org/science/physics/forces-newtons-laws",
      },
      {
        label: "Physics Classroom – Newton's Laws",
        url: "https://www.physicsclassroom.com/class/newtlaws",
      },
    ],
  },
  {
    id: "sci-periodic-table",
    title: "Periodic Table",
    category: "Science",
    definition:
      "The Periodic Table organizes all 118 known chemical elements by increasing atomic number, with elements sharing similar properties arranged in vertical columns (groups) and horizontal rows (periods).",
    steps: [
      "Elements are arranged by atomic number (protons in the nucleus).",
      "Periods (rows): 7 periods; elements in the same period have the same number of electron shells.",
      "Groups (columns): 18 groups; elements in the same group have similar chemical properties.",
      "Key blocks: s-block (groups 1-2), p-block (groups 13-18), d-block (transition metals), f-block (lanthanides/actinides).",
    ],
    keyPoints: [
      "Atomic number = number of protons; Mass number = protons + neutrons",
      "Metals (left), Metalloids (staircase), Non-metals (right)",
      "Noble gases (Group 18) are inert — full outer electron shell",
      "Electronegativity and ionization energy increase across a period",
    ],
    examples: [
      "H (1), He (2), Li (3), Na (11) — all Group 1 alkali metals are highly reactive",
      "Oxygen (8, non-metal) vs Iron (26, metal) vs Neon (10, noble gas)",
      "Period 3: Na, Mg, Al, Si, P, S, Cl, Ar — from metal to non-metal",
    ],
    resources: [
      {
        label: "Royal Society of Chemistry – Periodic Table",
        url: "https://www.rsc.org/periodic-table",
      },
      {
        label: "Khan Academy – Periodic Table",
        url: "https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:atomic-structure-and-properties/x2eef969c74e0d802:the-periodic-table/a/the-periodic-table",
      },
    ],
  },
  {
    id: "sci-cells",
    title: "Cell Biology",
    category: "Science",
    definition:
      "The cell is the basic structural and functional unit of all living organisms. All cells share certain features, but there are key differences between prokaryotic (no nucleus) and eukaryotic (has nucleus) cells.",
    steps: [
      "Identify cell type: Prokaryote (bacteria, archaea) or Eukaryote (plants, animals, fungi).",
      "Learn organelles: nucleus (DNA), mitochondria (energy), ribosomes (protein synthesis), ER (transport), Golgi (packaging).",
      "Plant cells additionally have: cell wall, chloroplasts, central vacuole.",
      "Understand cell processes: division (mitosis/meiosis), protein synthesis, respiration.",
    ],
    keyPoints: [
      "Cell Theory: all life is made of cells; cells come from existing cells",
      "Mitosis: produces 2 identical daughter cells for growth/repair",
      "Meiosis: produces 4 genetically diverse gametes for reproduction",
      "Cell membrane (phospholipid bilayer) controls what enters/exits",
    ],
    examples: [
      "Red blood cells lack nucleus — more room for hemoglobin",
      "Mitochondria have their own DNA — evidence of endosymbiosis theory",
      "Osmosis in cells: if external solution is hypertonic, water leaves cell → it shrinks",
    ],
    resources: [
      {
        label: "Khan Academy – Cells",
        url: "https://www.khanacademy.org/science/ap-biology/cell-structure-and-function",
      },
      {
        label: "British Society for Cell Biology",
        url: "https://bscb.org/learning-resources/softcell-e-learning/",
      },
    ],
  },
  {
    id: "sci-ecosystems",
    title: "Ecosystems",
    category: "Science",
    definition:
      "An ecosystem is a community of living organisms (biotic factors) interacting with each other and their non-living environment (abiotic factors: sunlight, water, temperature, soil). Energy flows and matter cycles through ecosystems.",
    steps: [
      "Identify producers (autotrophs: plants, algae), consumers (heterotrophs), and decomposers.",
      "Map food chains: Producer → Primary Consumer → Secondary Consumer → Tertiary Consumer.",
      "Combine food chains into food webs — more realistic model of feeding relationships.",
      "Understand energy pyramids: only ~10% of energy transfers to the next trophic level.",
      "Study nutrient cycles: carbon cycle, water cycle, nitrogen cycle.",
    ],
    keyPoints: [
      "Biotic: living things; Abiotic: non-living factors",
      "Trophic levels: producers, primary consumers, secondary consumers, apex predators",
      "Biodiversity increases ecosystem stability and resilience",
      "Disturbances (fires, floods) can trigger succession",
    ],
    examples: [
      "Food chain: Grass → Grasshopper → Frog → Snake → Eagle",
      "10% rule: 1000 kcal grass → 100 kcal grasshopper → 10 kcal frog",
      "Keystone species: sea otters keep sea urchin populations in check, protecting kelp forests",
    ],
    resources: [
      {
        label: "Khan Academy – Ecology",
        url: "https://www.khanacademy.org/science/ap-biology/ecology-ap",
      },
      {
        label: "National Geographic – Ecosystems",
        url: "https://education.nationalgeographic.org/resource/ecosystem/",
      },
    ],
  },
  // ---- ENGLISH ------------------------------------------------------------
  {
    id: "eng-parts-of-speech",
    title: "Parts of Speech",
    category: "English",
    definition:
      "Parts of speech are categories that classify words by their function in a sentence. The eight main parts of speech in English are: Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, and Interjection.",
    steps: [
      "Noun: names a person, place, thing, or idea (e.g., teacher, school, courage).",
      "Pronoun: replaces a noun (e.g., he, she, they, it, we).",
      "Verb: expresses action or state of being (e.g., run, think, is).",
      "Adjective: describes a noun (e.g., tall, blue, three).",
      "Adverb: modifies a verb, adjective, or another adverb (e.g., quickly, very, never).",
      "Preposition: shows relationship (e.g., in, on, at, behind, after).",
      "Conjunction: connects words/clauses (e.g., and, but, or, because, although).",
      "Interjection: expresses emotion (e.g., Wow!, Oh!, Oops!).",
    ],
    keyPoints: [
      "A word's part of speech depends on its function in the sentence",
      "Proper nouns (specific names) are capitalized; common nouns are not",
      "Transitive verbs need an object; intransitive verbs don't",
      "Conjunctions: coordinating (FANBOYS), subordinating, correlative",
    ],
    examples: [
      "The (article) clever (adj) student (noun) quickly (adv) solved (verb) the (article) difficult (adj) problem (noun).",
      "She (pronoun) ran (verb) into (preposition) the room (noun) and (conjunction) screamed (verb), 'Help!' (interjection)",
      "Identify the verb: 'The dog barked loudly.' → barked (verb), loudly (adverb)",
    ],
    resources: [
      {
        label: "Grammarly – Parts of Speech",
        url: "https://www.grammarly.com/blog/parts-of-speech/",
      },
      {
        label: "British Council – Grammar",
        url: "https://learnenglish.britishcouncil.org/grammar",
      },
    ],
  },
  {
    id: "eng-tenses",
    title: "Tenses",
    category: "English",
    definition:
      "Tenses indicate the time of an action or state of being. English has three main tenses (Past, Present, Future), each with four aspects (Simple, Continuous, Perfect, Perfect Continuous) giving 12 tense forms.",
    steps: [
      "Simple tenses: express facts, habits, completed actions (I eat / I ate / I will eat).",
      "Continuous tenses: express ongoing actions (I am eating / I was eating / I will be eating).",
      "Perfect tenses: express completed actions with relevance to another time (I have eaten / I had eaten / I will have eaten).",
      "Perfect Continuous: duration up to a point in time (I have been eating / I had been eating / I will have been eating).",
    ],
    keyPoints: [
      "Present Simple: habitual actions and facts",
      "Present Perfect: actions with present relevance (I have lost my keys)",
      "Past Simple vs Present Perfect: past simple is finished; present perfect has present connection",
      "Future: will (spontaneous), going to (planned), present continuous (scheduled)",
    ],
    examples: [
      "Present Perfect: 'I have studied for the exam.' (still relevant now)",
      "Past Continuous: 'I was reading when she called.'",
      "Future Perfect: 'By 6pm, I will have finished the homework.'",
    ],
    resources: [
      {
        label: "British Council – Tenses",
        url: "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar",
      },
      {
        label: "Grammarly – Verb Tenses",
        url: "https://www.grammarly.com/blog/verb-tenses/",
      },
    ],
  },
  {
    id: "eng-essay-writing",
    title: "Essay Writing Structure",
    category: "English",
    definition:
      "An essay is a structured piece of writing that presents and develops an argument or point of view. A standard essay has three parts: Introduction, Body Paragraphs, and Conclusion.",
    steps: [
      "Introduction: Hook (grab attention) → Background context → Thesis statement (your main argument).",
      "Body Paragraph 1: Topic sentence → Evidence/example → Explanation → Linking sentence.",
      "Body Paragraph 2–3: Same structure, each developing a distinct point supporting the thesis.",
      "Conclusion: Restate thesis in new words → Summarize main points → Closing thought or call to action.",
      "Proofread: Check grammar, spelling, sentence variety, and logical flow.",
    ],
    keyPoints: [
      "Each body paragraph makes ONE main point — don't mix ideas",
      "Use transition words: however, furthermore, in contrast, therefore",
      "Thesis statement is the backbone of the essay — it must be specific and arguable",
      "Show, don't tell: use specific evidence, not vague statements",
    ],
    examples: [
      "Hook: 'By 2050, half the world's species could be extinct.'",
      "Thesis: 'Governments must prioritize renewable energy to prevent irreversible climate damage.'",
      "Topic sentence: 'Solar energy offers a scalable, cost-effective solution to fossil fuel dependency.'",
    ],
    resources: [
      {
        label: "Purdue OWL – Essay Writing",
        url: "https://owl.purdue.edu/owl/general_writing/the_writing_process/index.html",
      },
      {
        label: "Khan Academy – Writing",
        url: "https://www.khanacademy.org/ela/cc-grammar",
      },
    ],
  },
  // ---- HISTORY ------------------------------------------------------------
  {
    id: "hist-ww2",
    title: "World War II",
    category: "History",
    definition:
      "World War II (1939–1945) was a global conflict involving most of the world's nations divided into two alliances: the Allies (UK, USA, USSR, France) and the Axis (Germany, Italy, Japan). It resulted in ~70–85 million deaths — the deadliest conflict in history.",
    steps: [
      "Causes: Rise of fascism, Great Depression, Treaty of Versailles failures, appeasement policy.",
      "1939: Germany invades Poland → Britain and France declare war.",
      "1940–41: Battle of Britain, German invasion of USSR (Operation Barbarossa), Japan attacks Pearl Harbor → USA enters.",
      "1942–43: Turning points — Battle of Stalingrad, El Alamein, Midway.",
      "1944–45: D-Day invasion (June 6, 1944), liberation of Europe, atomic bombs on Hiroshima/Nagasaki, Japan surrenders September 2, 1945.",
    ],
    keyPoints: [
      "Holocaust: systematic genocide of 6 million Jews and millions of others by Nazi Germany",
      "The war accelerated decolonization, the Cold War, and the creation of the UN",
      "Atomic bombs used for the first (and so far only) time in warfare",
      "Nuremberg Trials: Nazi leaders prosecuted for war crimes — established international law principles",
    ],
    examples: [
      "Operation Overlord (D-Day): 156,000 Allied troops landed in Normandy on June 6, 1944",
      "Battle of Britain: RAF defended UK against Luftwaffe bombing campaigns in 1940",
      "Hiroshima (Aug 6) and Nagasaki (Aug 9), 1945: ~200,000 deaths",
    ],
    resources: [
      {
        label: "BBC – World War II",
        url: "https://www.bbc.co.uk/history/worldwars/wwtwo/",
      },
      {
        label: "National WWII Museum",
        url: "https://www.nationalww2museum.org/students-teachers/student-resources",
      },
    ],
  },
  {
    id: "hist-ancient-civs",
    title: "Ancient Civilizations",
    category: "History",
    definition:
      "Ancient civilizations were early complex societies that arose in river valleys with agriculture, cities, governments, writing systems, and specialized labor. Major civilizations include Mesopotamia, Egypt, Indus Valley, China, Greece, and Rome.",
    steps: [
      "Mesopotamia (c. 3500 BCE): First writing (cuneiform), city-states, Code of Hammurabi — between Tigris & Euphrates (modern Iraq).",
      "Ancient Egypt (c. 3100 BCE): Pharaohs, hieroglyphics, pyramids, Nile flooding enabled agriculture.",
      "Indus Valley (c. 2600 BCE): Advanced urban planning, grid streets, sewage systems (Harappa, Mohenjo-daro).",
      "Ancient Greece (c. 800–146 BCE): Democracy, philosophy (Socrates, Plato, Aristotle), Olympic Games.",
      "Roman Civilization (c. 753 BCE–476 CE): Republic then Empire, law, engineering (aqueducts, roads), Latin language.",
    ],
    keyPoints: [
      "River valleys enabled farming surpluses → supported non-farming specialists",
      "Writing systems: cuneiform (Sumerians), hieroglyphics (Egyptians), Brahmi (India)",
      "Trade connected civilizations across thousands of miles",
      "Decline: climate change, invasions, internal political instability",
    ],
    examples: [
      "Code of Hammurabi (1754 BCE): 282 laws carved in stone — one of history's first legal codes",
      "Pyramids of Giza: built c. 2560 BCE; Great Pyramid = 2.3M stone blocks",
      "Roman Colosseum: could hold 50,000 spectators; completed 80 CE",
    ],
    resources: [
      {
        label: "Khan Academy – Ancient Civilizations",
        url: "https://www.khanacademy.org/humanities/world-history/ancient-medieval",
      },
      {
        label: "Ancient History Encyclopedia",
        url: "https://www.worldhistory.org/",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Category Pills Config
// ---------------------------------------------------------------------------
const TOPIC_CATEGORIES = [
  {
    label: "Math",
    emoji: "📐",
    color:
      "bg-sunshine/20 text-yellow-800 border-sunshine/40 hover:bg-sunshine/40",
  },
  {
    label: "Computer Science",
    emoji: "💻",
    color: "bg-skyblue/20 text-blue-800 border-skyblue/40 hover:bg-skyblue/40",
  },
  {
    label: "Science",
    emoji: "🔬",
    color: "bg-mint/20 text-green-800 border-mint/40 hover:bg-mint/40",
  },
  {
    label: "English",
    emoji: "📝",
    color:
      "bg-lavender/20 text-purple-800 border-lavender/40 hover:bg-lavender/40",
  },
  {
    label: "History",
    emoji: "🏛️",
    color: "bg-coral/20 text-orange-800 border-coral/40 hover:bg-coral/40",
  },
];

// ---------------------------------------------------------------------------
// TopicSearchSection
// ---------------------------------------------------------------------------
function TopicSearchSection() {
  const [query, setQuery] = useState("");

  const filtered =
    query.trim().length >= 2
      ? KNOWLEDGE_BASE.filter((t) => {
          const q = query.toLowerCase();
          return (
            t.title.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q) ||
            t.definition.toLowerCase().includes(q) ||
            t.keyPoints.some((kp) => kp.toLowerCase().includes(q))
          );
        })
      : [];

  const showResults = query.trim().length >= 2;

  return (
    <section
      id="knowledge"
      className="py-16 px-4 bg-muted/30 border-y border-border"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 px-4 py-1.5 bg-skyblue/20 text-blue-800 border-skyblue/40 text-sm font-medium">
              🔍 Knowledge Engine
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Search Any Topic
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Get a full explanation — definition, step-by-step guide, key
              points, examples, and more.
            </p>
          </motion.div>
        </div>

        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. photosynthesis, recursion, BODMAS, World War II…"
            className="pl-12 pr-10 py-6 text-base rounded-2xl border-border shadow-sm focus-visible:ring-primary"
            data-ocid="knowledge.search_input"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category pills — shown when search is empty */}
        {!showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 justify-center mb-4"
          >
            {TOPIC_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.label}
                onClick={() => setQuery(cat.label)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${cat.color}`}
                data-ocid="knowledge.tab"
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {showResults && filtered.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
              data-ocid="knowledge.empty_state"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-semibold text-foreground mb-2">
                No topics found for "{query}"
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                Try searching a subject like "algebra", "loops",
                "photosynthesis", or "tenses".
              </p>
              <p className="text-sm text-muted-foreground">
                Can't find your topic?{" "}
                <a
                  href="#ask"
                  className="text-primary underline underline-offset-2"
                >
                  Ask a teacher anonymously →
                </a>
              </p>
            </motion.div>
          )}

          {showResults && filtered.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filtered.map((topic, idx) => (
                <TopicCard key={topic.id} topic={topic} index={idx + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// TopicCard
// ---------------------------------------------------------------------------
function TopicCard({ topic, index }: { topic: KnowledgeTopic; index: number }) {
  const catColor = CATEGORY_COLORS[topic.category] ?? CATEGORY_COLORS.Other;
  const ocid = `knowledge.item.${index}` as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index - 1) * 0.07 }}
      data-ocid={ocid}
    >
      <Card className="shadow-card border-border overflow-hidden">
        <CardHeader className="pb-3 border-b border-border bg-card">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <Badge className={`mb-2 text-xs ${catColor}`}>
                {topic.category}
              </Badge>
              <CardTitle className="font-display text-xl text-foreground">
                {topic.title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Explanation</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Accordion type="multiple" defaultValue={["definition"]}>
            {/* Definition */}
            <AccordionItem
              value="definition"
              className="border-b border-border"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/40 font-semibold text-sm">
                <span className="flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-primary" />
                  Definition
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-2">
                <p className="text-foreground/90 leading-relaxed text-sm">
                  {topic.definition}
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Steps */}
            <AccordionItem value="steps" className="border-b border-border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/40 font-semibold text-sm">
                <span className="flex items-center gap-2">
                  <StepForward className="w-4 h-4 text-primary" />
                  Step-by-step Explanation
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-2">
                <ol className="space-y-2">
                  {topic.steps.map((step, i) => (
                    <li key={step.slice(0, 20)} className="flex gap-3 text-sm">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-foreground/90 leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>

            {/* Key Points */}
            <AccordionItem value="keypoints" className="border-b border-border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/40 font-semibold text-sm">
                <span className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-primary" />
                  Key Points
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-2">
                <ul className="space-y-2">
                  {topic.keyPoints.map((kp) => (
                    <li key={kp.slice(0, 20)} className="flex gap-2 text-sm">
                      <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90 leading-relaxed">
                        {kp}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Examples */}
            <AccordionItem value="examples" className="border-b border-border">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/40 font-semibold text-sm">
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  Examples
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-2">
                <div className="space-y-2">
                  {topic.examples.map((ex) => (
                    <div
                      key={ex.slice(0, 20)}
                      className="bg-muted rounded-lg px-4 py-2.5 font-mono text-sm text-foreground/90 border border-border"
                    >
                      <TestTube className="w-3.5 h-3.5 inline mr-2 text-primary opacity-60" />
                      {ex}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Resources */}
            <AccordionItem value="resources" className="border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/40 font-semibold text-sm">
                <span className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-primary" />
                  Additional Learning Resources
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-2">
                <ul className="space-y-2">
                  {topic.resources.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline underline-offset-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function HeroSection() {
  const encouragements = [
    { emoji: "💡", text: "No question is a bad question." },
    { emoji: "🌟", text: "Ask freely, learn confidently." },
    { emoji: "🚀", text: "Curiosity is your superpower." },
    { emoji: "🤝", text: "Every expert was once a beginner." },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-16 pb-24 px-4">
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-sunshine/20 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-skyblue/15 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-coral/10 blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 px-4 py-1.5 bg-sunshine/20 text-yellow-800 border-sunshine/40 text-sm font-medium">
            ✨ A safe space to learn
          </Badge>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-foreground leading-tight mb-4">
            Ask<span className="text-primary">Freely</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-body mb-3">
            Ask freely, learn confidently.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10">
            We know asking a question in class can feel scary. Here, you can ask
            anything — anonymously — and get clear answers from real teachers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="rounded-full px-8 font-semibold shadow-warm text-base"
              onClick={() =>
                document
                  .getElementById("ask")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="home.primary_button"
            >
              Ask a Question Anonymously
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 font-semibold text-base"
              onClick={() =>
                document
                  .getElementById("library")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="home.secondary_button"
            >
              Browse Doubt Library
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {encouragements.map((e) => (
            <div
              key={e.text}
              className="bg-card rounded-2xl border border-border p-4 shadow-card flex items-start gap-3"
            >
              <span className="text-2xl">{e.emoji}</span>
              <p className="text-sm font-medium text-foreground text-left">
                {e.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Ask a Doubt
// ---------------------------------------------------------------------------
function AskSection() {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("Math");
  const [submitted, setSubmitted] = useState(false);
  const submitDoubt = useSubmitDoubt();

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast.error("Please type your question first!");
      return;
    }
    try {
      await submitDoubt.mutateAsync({ category, message: question.trim() });
      setSubmitted(true);
      setQuestion("");
      toast.success("Your question has been sent to teachers!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="ask" className="py-20 px-4 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-sunshine/20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-yellow-700" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
              Ask a Doubt
            </h2>
            <p className="text-muted-foreground">
              Your identity is completely hidden. Ask away!
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-mint/10 border border-mint/30 rounded-2xl p-8 text-center"
                data-ocid="ask.success_state"
              >
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Question Sent! 🎉
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your question has been sent to the teachers. You'll find the
                  answer in the Doubt Library once a teacher responds.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setSubmitted(false)}
                  data-ocid="ask.secondary_button"
                >
                  Ask Another Question
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-float"
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="font-semibold text-foreground">
                      Subject Category
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger
                        className="rounded-xl"
                        data-ocid="ask.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold text-foreground">
                      Your Question
                    </Label>
                    <Textarea
                      placeholder="Type your question here... Don't worry, no one will know it's you!"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="rounded-xl resize-none min-h-[120px]"
                      data-ocid="ask.search_input"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
                          handleSubmit();
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: Press Ctrl+Enter to submit quickly
                    </p>
                  </div>

                  <Button
                    className="w-full rounded-xl py-6 text-base font-semibold shadow-warm"
                    onClick={handleSubmit}
                    disabled={submitDoubt.isPending || !question.trim()}
                    data-ocid="ask.primary_button"
                  >
                    {submitDoubt.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Ask Anonymously
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    🔒 Your question is 100% anonymous. No login required.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Doubt Library — answered doubts only
// ---------------------------------------------------------------------------
function DoubtLibrarySection() {
  const { data: doubts, isLoading } = useAnsweredDoubts();

  return (
    <section id="library" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-skyblue/20 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-blue-700" />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
            Doubt Library
          </h2>
          <p className="text-muted-foreground">
            Questions answered by our teachers — browse and learn!
          </p>
        </motion.div>

        {isLoading && (
          <div
            className="flex justify-center py-16"
            data-ocid="library.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && (!doubts || doubts.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-card rounded-2xl border border-border"
            data-ocid="library.empty_state"
          >
            <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              No answered questions yet
            </h3>
            <p className="text-muted-foreground">
              Be the first to ask — teachers will respond soon!
            </p>
            <Button
              className="mt-6 rounded-full"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("ask")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ask a Doubt
            </Button>
          </motion.div>
        )}

        {!isLoading && doubts && doubts.length > 0 && (
          <div className="space-y-5" data-ocid="library.list">
            {doubts.map((doubt: Doubt, idx: number) => (
              <motion.div
                key={doubt.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.3) }}
                data-ocid={`library.item.${idx + 1}`}
              >
                <Card className="rounded-2xl border border-border shadow-card hover:shadow-float transition-shadow">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <Badge
                        className={`text-xs font-medium border ${
                          CATEGORY_COLORS[doubt.category] ??
                          CATEGORY_COLORS.Other
                        }`}
                      >
                        {doubt.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatTime(doubt.timestamp)}
                      </span>
                    </div>

                    {/* Student question */}
                    <div className="bg-muted/50 rounded-xl p-4 mb-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Student Question
                      </p>
                      <p className="text-foreground font-medium">
                        {doubt.message}
                      </p>
                    </div>

                    {/* Teacher answer */}
                    {doubt.answer.__kind__ === "Some" && (
                      <div className="bg-mint/10 rounded-xl p-4 border border-mint/20">
                        <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">
                          ✓ Teacher's Answer
                        </p>
                        <p className="text-foreground leading-relaxed">
                          {doubt.answer.value}
                        </p>
                        {doubt.answeredBy.__kind__ === "Some" && (
                          <p className="text-xs text-muted-foreground mt-3">
                            — Answered by{" "}
                            <span className="font-semibold">
                              {doubt.answeredBy.value}
                            </span>
                            {doubt.answeredAt.__kind__ === "Some" && (
                              <span>
                                {" "}
                                on {formatTime(doubt.answeredAt.value)}
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Teacher answer form — used inside the detail panel for unanswered doubts
// ---------------------------------------------------------------------------
function TeacherAnswerCard({
  doubt,
  index,
}: {
  doubt: Doubt;
  index: number;
}) {
  const [teacherName, setTeacherName] = useState("");
  const [answer, setAnswer] = useState("");
  const answerDoubt = useAnswerDoubt();

  const handleSubmit = async () => {
    if (!teacherName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!answer.trim()) {
      toast.error("Please type an answer.");
      return;
    }
    try {
      await answerDoubt.mutateAsync({
        doubtId: doubt.id,
        teacherName: teacherName.trim(),
        answer: answer.trim(),
      });
      toast.success(
        "Answer submitted! The student will see it in the Doubt Library.",
      );
      setTeacherName("");
      setAnswer("");
    } catch {
      toast.error("Failed to submit answer. Please try again.");
    }
  };

  return (
    <div className="space-y-3" data-ocid={`teachers.item.${index + 1}`}>
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold">Your Name</Label>
        <Input
          placeholder="e.g. Mr. Sharma"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          className="rounded-xl"
          data-ocid={`teachers.input.${index + 1}`}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-semibold">Your Answer</Label>
        <Textarea
          placeholder="Type a clear, detailed answer for the student..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="rounded-xl resize-none min-h-[140px]"
          data-ocid={`teachers.textarea.${index + 1}`}
        />
      </div>

      <Button
        className="w-full rounded-xl font-semibold"
        onClick={handleSubmit}
        disabled={
          answerDoubt.isPending || !teacherName.trim() || !answer.trim()
        }
        data-ocid={`teachers.submit_button.${index + 1}`}
      >
        {answerDoubt.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <MessageSquare className="mr-2 h-4 w-4" />
            Submit Answer
          </>
        )}
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Teachers Dashboard — two-column layout with selectable question list
// ---------------------------------------------------------------------------
function TeachersSection() {
  const { data: doubts, isLoading } = useAllDoubts();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedDoubt = doubts?.find((d) => d.id === selectedId) ?? null;
  const selectedIndex = doubts?.findIndex((d) => d.id === selectedId) ?? 0;

  const pendingCount =
    doubts?.filter((d) => d.answer.__kind__ === "None").length ?? 0;

  return (
    <section id="teachers" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-coral/20 flex items-center justify-center mx-auto mb-4">
            <Users className="w-7 h-7 text-orange-700" />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
            Teacher Dashboard
          </h2>
          <p className="text-muted-foreground">
            View all student questions and provide detailed answers below.
          </p>
          {!isLoading && doubts && doubts.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {doubts.length} total question{doubts.length !== 1 ? "s" : ""}
              </Badge>
              {pendingCount > 0 && (
                <Badge className="text-sm px-3 py-1 bg-coral/20 text-orange-800 border-coral/40 border">
                  {pendingCount} awaiting answer{pendingCount !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          )}
        </motion.div>

        {isLoading && (
          <div
            className="flex justify-center py-16"
            data-ocid="teachers.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && (!doubts || doubts.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-card rounded-2xl border border-border"
            data-ocid="teachers.empty_state"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              No questions yet
            </h3>
            <p className="text-muted-foreground">
              Students haven't submitted any questions yet. Check back soon!
            </p>
          </motion.div>
        )}

        {!isLoading && doubts && doubts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row gap-5 bg-card rounded-3xl border border-border shadow-card overflow-hidden"
            data-ocid="teachers.panel"
          >
            {/* Left: Question List */}
            <div className="md:w-[42%] border-b md:border-b-0 md:border-r border-border flex flex-col">
              <div className="px-4 py-3 border-b border-border bg-muted/40">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  All Questions
                </p>
              </div>
              <ScrollArea className="flex-1 max-h-[480px] md:max-h-[580px]">
                <div className="p-2 space-y-1" data-ocid="teachers.list">
                  {doubts.map((doubt: Doubt, idx: number) => {
                    const isAnswered = doubt.answer.__kind__ === "Some";
                    const isSelected = selectedId === doubt.id;
                    return (
                      <button
                        key={doubt.id}
                        type="button"
                        onClick={() =>
                          setSelectedId(isSelected ? null : doubt.id)
                        }
                        data-ocid={`teachers.item.${idx + 1}`}
                        className={`w-full text-left px-3 py-3 rounded-xl transition-all group ${
                          isSelected
                            ? "bg-primary/10 border border-primary/30"
                            : "hover:bg-muted/60 border border-transparent"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <Badge
                            className={`text-[10px] font-medium border shrink-0 ${
                              CATEGORY_COLORS[doubt.category] ??
                              CATEGORY_COLORS.Other
                            }`}
                          >
                            {doubt.category}
                          </Badge>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                              isAnswered
                                ? "bg-mint/20 text-green-700"
                                : "bg-sunshine/20 text-yellow-700"
                            }`}
                          >
                            {isAnswered ? "✓ Answered" : "⏳ Pending"}
                          </span>
                        </div>
                        <p
                          className={`text-sm leading-snug line-clamp-2 ${
                            isSelected
                              ? "text-foreground font-medium"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {doubt.message}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1.5">
                          {formatTime(doubt.timestamp)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Right: Detail Panel */}
            <div className="flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                {!selectedDoubt ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center"
                    data-ocid="teachers.empty_state"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <MessageSquare className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      Select a question
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Choose a question from the list on the left to view it and
                      provide your answer.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selectedDoubt.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                    className="flex-1 flex flex-col p-5 md:p-6 gap-5"
                  >
                    {/* Question header */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`text-xs font-medium border ${
                              CATEGORY_COLORS[selectedDoubt.category] ??
                              CATEGORY_COLORS.Other
                            }`}
                          >
                            {selectedDoubt.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(selectedDoubt.timestamp)}
                          </span>
                        </div>
                        {selectedDoubt.answer.__kind__ === "Some" ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-mint/20 px-2 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Answered
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-sunshine/20 px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </div>

                      {/* Full question */}
                      <div className="bg-muted/60 rounded-2xl p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Student's Question
                        </p>
                        <p className="text-foreground font-medium leading-relaxed">
                          {selectedDoubt.message}
                        </p>
                      </div>
                    </div>

                    {/* Content: answer or form */}
                    {selectedDoubt.answer.__kind__ === "Some" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-mint/10 rounded-2xl p-5 border border-mint/20">
                          <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">
                            ✓ Teacher's Answer
                          </p>
                          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                            {selectedDoubt.answer.value}
                          </p>
                          {selectedDoubt.answeredBy.__kind__ === "Some" && (
                            <div className="mt-4 pt-3 border-t border-mint/20">
                              <p className="text-xs text-muted-foreground">
                                — Answered by{" "}
                                <span className="font-semibold text-foreground">
                                  {selectedDoubt.answeredBy.value}
                                </span>
                                {selectedDoubt.answeredAt.__kind__ ===
                                  "Some" && (
                                  <span>
                                    {" "}
                                    on{" "}
                                    {formatTime(selectedDoubt.answeredAt.value)}
                                  </span>
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="rounded-2xl border border-border">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold text-foreground">
                              Provide Your Answer
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                              Your response will appear publicly under this
                              question.
                            </p>
                          </CardHeader>
                          <CardContent>
                            <TeacherAnswerCard
                              doubt={selectedDoubt}
                              index={selectedIndex}
                            />
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
function AboutSection() {
  const features = [
    {
      icon: "🎭",
      title: "100% Anonymous",
      desc: "No names, no login, no fear. Ask anything without revealing who you are.",
    },
    {
      icon: "👩\u200d🏫",
      title: "Real Teacher Answers",
      desc: "Your questions are seen and answered by qualified, caring teachers.",
    },
    {
      icon: "📚",
      title: "Doubt Library",
      desc: "Explore hundreds of answered questions — someone may have already asked yours!",
    },
    {
      icon: "⚡",
      title: "Quick & Simple",
      desc: "Designed for students. Clean, fast, and easy to use on any device.",
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-14 h-14 rounded-2xl bg-lavender/20 flex items-center justify-center mx-auto mb-4">
            <Star className="w-7 h-7 text-purple-700" />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
            About AskFreely
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            AskFreely was built for every student who has ever hesitated to
            raise their hand in class. We believe no student should fall behind
            because they were afraid to ask.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="rounded-2xl border border-border shadow-card h-full">
                <CardContent className="p-6">
                  <span className="text-3xl mb-3 block">{f.icon}</span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-gradient-to-br from-sunshine/10 via-skyblue/10 to-mint/10 rounded-3xl p-8 text-center border border-border"
        >
          <h3 className="font-display font-bold text-2xl text-foreground mb-3">
            Ready to ask your first question?
          </h3>
          <p className="text-muted-foreground mb-6">
            Remember: every expert was once a student who asked questions.
          </p>
          <Button
            className="rounded-full px-8 font-semibold shadow-warm"
            onClick={() =>
              document
                .getElementById("ask")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="about.primary_button"
          >
            Ask Anonymously
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          <span className="font-display font-semibold text-foreground">
            AskFreely
          </span>
          <span>— Ask without fear, learn with confidence.</span>
        </div>
        <p>
          © {year}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// App root
// ---------------------------------------------------------------------------
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <NavBar />
      <main>
        <HeroSection />
        <TopicSearchSection />
        <AskSection />
        <DoubtLibrarySection />
        <TeachersSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

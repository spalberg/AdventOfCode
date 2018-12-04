import java.io.File;

File("./input.txt").forEachLine { Piece(it) }

class Piece {
  constructor(data: String) {
    val regex = """\#(\d+) @ (\d+),(\d+): (\d+)x(\d+)""".toRegex()
    println(regex.find(data)?.groupValues?.get(1))
  }
}

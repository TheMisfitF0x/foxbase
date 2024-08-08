# The FoxBase
This repo contains my current working build for the game [Screeps](https://screeps.com/). It's not great, so feel free to steal it. 
The primary purpose of this repository is to facilitate and document my foray and practice in the wonderful world of software development.
It is worth mentioning that I am actively experimenting with designing before I write, and realizing that I'm really bad at it. 
As such, the design document below, which is what this codebase is aiming to create, is horrifically out of date already compared to what has already been developed. I _will_ get back to updating it, but that will likely occur after the first two RCLs have been implemented.


# Screeps Action Plan
_Iteration Name: The Executor’s Plan_
## Objectives (The Intended Behavior):
Below is the plain-english process I want the creeps to follow. This is separated by Room Controller Level (RCL), as that's the benchmark I wish to use to decide creep expansion.
### Phase 1: Starting the colony
- **RCL 1:**
  - Plot infrastructure:
    - Roads from spawn to energy deposits
    - Containers at the end of the energy roads
    - Road from spawn to Room Controller
  - Spawn and maintain 1 Running Miner per energy deposit
  - Spawn and maintain 1 Upgrader to maintain the starting room
  - Spawn and maintain 2 Constructors to begin constructing the plotted infrastructure.
- **RCL 2:**
  - Plot infrastructure:
  - 5 Extensions adjacent to the Controller Road, as close as possible to the spawn.
  - When containers are completed:
    - Order all Running Miners to act like Constructors.
    - Begin spawning and maintaining 1 Standing Miner per energy deposit.
    - Begin spawning and maintaining 1 Truck per energy deposit.


## The Approach: The Commander’s Plan _(AKA much command pattern)_
Thinking of three commanders: Resourcing/Expansion, Combat, and Construction/Maintenance. Commanders send Orders to the Crew Master, complete with location, action, and the ID of the object to interact with. The Crew Master keeps a list of creeps that are not currently processing a command, and sends Screeps the commands, prioritizing the Combat commands first. Screeps report to the Crew Master when they’ve completed a task, who keeps the list of available creeps in memory. In most situations, the Commanders’ decisions are determined by a settings module, formatted as a set of rules for each RCL. The kicker there is that each room has a set of commanders. Eventually, this program will be expanded out to an executor (or set of executors) who oversee global operations, delegating missions to commanders (this may be where Goal-Oriented Action Planning) can come in handy).

### Example
So, typical order goes as such:
1. Resourcing commander notices that a creep died and dropped resources. 
2. He creates an Order object with the location of the resource pool, specifies that the energy is to be collected and returned to the nearest open energy stash.
3. He gives that Order to the Crew Master, who adds it to the queue. 
4. When the Crew Master gets to that Order, he finds a nearby open Truck and gives the Order to the Truck.
5. Truck reads and carries out the Order. In this case, since the resource is volatile (has a strong potential to disappear), the resource is checked every tick and canceled if it no longer exists.


	
### Each Commander in (more) detail:
- Combat Commander
  - Spawns: 
    - Warriors (Melee)
    - Strikers (Ranged)
    - Speakers (Healers)
    - Generals (Room Capture Agents)
  - Issues repair/rearm orders for Walls, Turrets.
  - Requests outposts and defenses from the Construction Commander
  - Sends escorts and capture parties as requested by the Resourcing Commander.
  - Generally dormant unless planned by the Executor. Commands are usually the highest priority.
- Resourcing Commander
  - Spawns:
    - Miners 
    - Trucks
  - When commissioning Miners, they are spawned with their orders pre-assigned.
  - Orders Trucks around. Trucks are always given a destination when given Retrieve Commands, but if the destination is full they will deliver to the closest location with space.

### Challenges/Questions:
- How do we ensure that an order is only created once for a task?
  - I think this is combated by just having the Commanders issue orders on problems as they are seen, rather than all at once. Compared to before, the scans of the environment are much more narrow in scope and not executed every tick, just the tick after something happens. The commanders only react and carry out the instructions in the Executor’s plan.
- What does a Constructor or an Upgrader creep do if it does not have an order to execute? What’s the default behavior?
  - Not sure yet. May have these ones wander closer to sources, or commit themselves to different rooms, if available. 
  - These are both similar in required specs, entirely possible the answer is to have them switch between the two?
  - Alternatively have them begin accepting orders from other commanders (Equip Trucks with a WORK so they can do light construction work, perhaps)?
  - Most of this points to heavily altering the way creeps behave. A baseline order parser and then a more in-depth script for executing order. Parser would only need to run if the creep doesn’t have an order.
